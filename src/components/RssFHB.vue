<script>
export default {
    data() {
        return {
            rssUrl: 'https://theflawedhumanbeings.substack.com/feed',
            posts: []
        }
    },
    mounted() {
        this.getPosts();
    },
    methods: {
        async getPosts() {
            try {
                // Fetch the RSS feed
                const response = await fetch(this.rssUrl);
                const text = await response.text();
                
                // Parse XML to DOM
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(text, 'text/xml');
                
                // Extract items
                const items = xmlDoc.querySelectorAll('item');
                
                // Convert items to array of objects
                this.posts = Array.from(items).slice(0, 12).map(item => ({
                    title: item.querySelector('title')?.textContent || '',
                    description: item.querySelector('description')?.textContent || '',
                    pubDate: new Date(item.querySelector('pubDate')?.textContent || '').toLocaleDateString(),
                    link: item.querySelector('link')?.textContent || ''
                }));
            } catch (error) {
                console.error('Error fetching RSS feed:', error);
                this.posts = [];
            }
        }
    }
}
</script>

<template>
    <div>
        <ul>
            <li v-for="post in posts" :key="post.link">
                <div class="p-5 font-semibold text-white mx-auto">
                    <div class="inline-block text-left">
                        <div class="text-5xl pt-2" style="line-height: 60px;" v-html="post.title"></div>
                        <div class="text-xl pt-2" v-html="post.description"></div>
                        <br />                        
                        <div class="grid grid-cols-2">
                            <div class="text-left" style="color: #FFF500;">{{ post.pubDate }}</div>
                            <div class="text-right">
                                <a :href="post.link" class="text-white underline" target="_blank" rel="noopener noreferrer">
                                    Follow along with The Flawed Human Beings on SubStack!
                                </a>
                            </div>
                        </div>                        
                    </div>                    
                </div>                    
            </li>
        </ul>
    </div>  
</template>
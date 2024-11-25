<script>
import { ref, onMounted } from 'vue';

export default {
    setup() {
        const rssUrl = 'https://api.substack.com/feed/podcast/3376381.rss'; // We'll create this endpoint on your backend
        const posts = ref([]);

        const getPosts = async () => {
            try {
                const response = await fetch(rssUrl);
                const text = await response.text();
                
                // Parse XML to DOM
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(text, 'text/xml');
                
                // Extract items
                const items = xmlDoc.getElementsByTagName('item');
                
                // Convert items to array of objects
                posts.value = Array.from(items).slice(0, 12).map(item => ({
                    title: item.getElementsByTagName('title')[0]?.textContent || '',
                    description: item.getElementsByTagName('description')[0]?.textContent || '',
                    pubDate: new Date(item.getElementsByTagName('pubDate')[0]?.textContent || '').toLocaleDateString(),
                    link: item.getElementsByTagName('link')[0]?.textContent || ''
                }));

                console.log('Posts loaded:', posts.value.length);
            } catch (error) {
                console.error('Error fetching RSS feed:', error);
                posts.value = [];
            }
        };

        onMounted(() => {
            getPosts();
        });

        return {
            posts
        };
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

<style scoped>
ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
}
</style>

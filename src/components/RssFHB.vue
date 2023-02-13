<script>
    export default {
        data() {
            return {
                rssUrl: 'https://api.rss2json.com/v1/api.json?rss_url=https://flawedhumanbeing.substack.com/feed.rss',
                posts: []
            }
        },
        mounted(){
            this.GetPosts();
        },
        methods:{
            GetPosts(){
                fetch(this.rssUrl)
                .then(response => response.json())
                .then((responseJson) => {this.ParseJson(responseJson);})
            },
            ParseJson(data){
                console.log(data.items);
                this.posts = data.items;
            }
        }
    }
</script>

<template>
    <div>
        <ul>
            <li v-for="post in posts">
                <div class="p-3 bg-shark rounded-3xl m-5 font-semibold text-gray-300 text-center  w-3/4 mx-auto">
                    <div class="inline-block text-left">
                        <div class="text-xl pt-2" v-html="post.title"></div>
                        <div class="text-xl pt-2" v-html="post.description"></div>
                        <br />                        
                        <div class="grid grid-cols-2">
                            <div class="text-left" style="color: #dabb1e">{{ post.pubDate }}</div>
                            <div class="text-right"><a v-bind:href="post.link" class="text-gray-900">View on SubStack</a></div>
                        </div>                        
                    </div>                    
                </div>                    
            </li>
        </ul>
    </div>  
</template>
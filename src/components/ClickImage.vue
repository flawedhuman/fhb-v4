<script>
    export default {
        data() {
            return { 
                myAlbums: [
                    { year: 1, title: 'taco' },
                    { year: 2, title: 'taco1' },
                    { year: 3, title: 'taco2' },
                    { year: 4, title: 'taco3' },
                    { year: 5, title: 'taco4' }
                ]
            };
        },
        methods:{
            clickAddAlbum(name) {
                console.log(name);
                const newAlbum = { year: 1980, title: 'New Item' };
                this.myAlbums.push(newAlbum);
            }
        }
    }
</script>

<template>
    <button @click="clickAddAlbum('tacossss')">CLICKA ME MARIO!</button>
    <ul>
        <li v-for="album in myAlbums">{{ album.year }} / {{ album.title }}</li>
    </ul>
</template>

<style>

    ul {
        margin: 3em;
        list-style-type: disc;
    }

</style>
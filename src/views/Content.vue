<template>
    <div class="container">
        <h1 v-if="notfound">Couldn't find the requested resource!</h1>

        <img v-if="image" v-bind:src="image" />

        <video controls autoplay name="media" v-if="video">
            <source v-bind:src="video" />
        </video>
    </div>
</template>

<script>
    export default {
        name: "document",
        data() {
            return {
                image: "",
                video: "",
                notfound: false,
            };
        },
        metaInfo() {
            return {
                meta: [
                    {
                        name: "description",
                        content: "Image shared on nr5 dot no screenshot service",
                    },
                    { property: "og:title", content: "nr5 dot no screenshot service" },
                    { property: "og:type", content: "website" },
                    { property: "og:image", content: `https://storage.googleapis.com/nr5enno.appspot.com/${this.$route.params.id}` },
                    { property: "og:url", content: `https://nr5.no/${this.$route.params.id}` }
                ],
            };
        },
        mounted() {
            this.fetchDocument();
        },
        methods: {
            async fetchDocument() {
                const rq = await fetch(
                    `https://storage.googleapis.com/nr5enno.appspot.com/${this.$route.params.id}`
                );

                if (rq.ok) {
                    const blob = await rq.blob();

                    if (blob.type.startsWith("image")) {
                        this.image = URL.createObjectURL(blob);
                    } else if (blob.type.startsWith("video")) {
                        this.video = URL.createObjectURL(blob);
                    }
                } else {
                    this.notfound = true;
                }
            },
        },
    };
</script>

<style>
    .container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
    }

    .container > img {
        max-height: 100%;
    }

    .container > h1 {
        font-weight: 300;
    }
</style>
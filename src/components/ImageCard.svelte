<script lang="ts">
    export let image: string;
    export let title: string;
    export let alt: string;
</script>

<div class="root">
    <div class="img-back">
        <img src={image} alt={alt}>
    </div>
    <div class="content">
        <p class="title">{title}</p>
        <p class="desc"><slot /></p>
    </div>
</div>

<style>
    .root {
        height: 350px;
        width: 250px;
        border: #4b4b4d solid 1px;
        border-radius: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .root:hover {
        border: #ffffff solid 1px;
    }
    .img-back {
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
        width: 250px;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #18191a;
    }
    img {
        height:175px;
        width:125px;
    }
    .content {
        height: 175px;
        width: 225px;
    }
    .title {
        font-family: "Open Sans";
        color: white;
        font-size: 20px;
        font-weight: 600;
    }
    .desc {
        font-family: "Open Sans";
        color: #bfc1c4;
        font-weight: 300;
    }
</style>
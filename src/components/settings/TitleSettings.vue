<template>
    <div class="row bg-grey-3 items-center q-pa-md container_title">
        <q-avatar text-color="white" :icon="icon" size="50px" :style="'background-color: ' + color"/>
        <div class="q-ml-md text_title">
            {{ title }}
        </div>
    </div>
</template>
<script>
export default {
    props: {
        title: String,
        color: String,
        icon: String
    }
}
</script>

<style scoped>
    .avatar {
        background-color: #0575b54f;
    }
    .container_title {
        border-radius: 10px;
    }
    .text_title {
        font-size: 22px;
        font-weight: 300;
        color: #555;
    }
</style>
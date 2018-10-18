<template>
    <div>
        <h1></h1>
        <article></article>
        </div>
</template>

<script>
export default {
    data(){
        return {
            id:this.$router.params.id,
            item:{}
        }
    },

    created() {
        this.$http.get('http://comento.cafe24.com/detail.php?req_no=' + this.id).then(function(data){
            console.log(data)
            this.item = data.body;
        });
    }
}
</script>


</style>

<style>
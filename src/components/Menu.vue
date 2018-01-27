
<template lang="jade"  src="../_nav.jade">
    
</template>

<script>
// import Sub from './Sub.vue';
export default {
    name: 'Menu',
    data() {
        return {
            isMobile: false,
            isShowMenu: false,
            isShowSubMenu: false
        };
    },
    computed: {},
    mounted() {
        if (!IsMobile) {
            // this.isShowMenu = !IsMobile;
            $('#pageMain').on('click', e => {
                if (this.isShowMenu) {
                    this.closeSubMenu(e);
                }
            });
        }
    },
    methods: {
        toggleSubMenu: function(e) {
            e.preventDefault();
            this.isShowSubMenu = !this.isShowSubMenu;
        },
        toggleMenu: function(e) {
            e.preventDefault();
            
            if (IsMobile) {
                this.isShowMenu = !this.isShowMenu;
            }
        },
        closeSubMenu:function(e) {
            this.isShowSubMenu = false;
        }
    }
};
</script>

<style scoped>

</style>

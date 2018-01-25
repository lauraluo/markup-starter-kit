import Vue from 'vue';
import Menu from './components/Menu.vue';
import Key from './components/Key.vue';

new Vue({
    el: '#nav',
    render: h => h(Menu)
});

new Vue({
    el: '#key',
    render: function(createElement) {
        var href = location.href;
        var _currentKeyPage = 0;
        
        if(href.indexOf('key.1') > -1){
            _currentKeyPage = 1;
        }else if(href.indexOf('key.2') > -1){
            _currentKeyPage = 2;

        }else if(href.indexOf('key.3') > -1){
            _currentKeyPage = 3;

        }
       
        console.log(_currentKeyPage);
        return createElement(Key, {
            props: {
                currentKeyPage: _currentKeyPage
            }
        });
    }
});

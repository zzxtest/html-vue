<template>
  <div id="app">
    <transition name="router-fade" mode="out-in">
		<keep-alive>
		    <router-view v-if="$route.meta.keepAlive"></router-view>
		</keep-alive>
	</transition>
	<transition name="router-fade" mode="out-in">
		<router-view v-if="!$route.meta.keepAlive"></router-view>
	</transition>
  </div>
</template>

<script>
export default {
  	name: 'App',
  	created() {
	  	try {
	    	document.body.removeChild(document.getElementById('appLoading'))
	  	} catch (e) {

	  	}
	}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
.router-fade-enter-active, .router-fade-leave-active {
  	transition: opacity .3s;
}
.router-fade-enter, .router-fade-leave-active {
  	opacity: 0;
}
</style>

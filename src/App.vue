<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="info" id="nav-css">
      <b-container fluid>
        <b-navbar-brand :to="{ name: 'home' }">Hello POL</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item :to="{ name: 'about' }">About me</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
#nav-css {
  padding-left: 0;
}
</style>

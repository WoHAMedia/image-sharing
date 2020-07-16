<template>
<div class="viewport">
      <header>
<router-view></router-view>
          </header>

      <footer>
          <p>nr5 dot no image service &copy; {{ year }}</p>
      </footer>
  </div>
  
</template>

<script>
import moment from 'moment'

export default {
    name: 'App',
    data() {
        return {
            year: moment().year()
        }
    }
}
</script>

<style>
* {
    margin: 0;
    padding: 0;
}

html, body {
    height: -webkit-fill-available;  /* Mozilla-based browsers will ignore this. */
    height: 100vh;
}

body {
    font-family: 'Roboto', sans-serif;
}


.viewport {
    display: grid;
    grid-template-rows: 1fr 4rem;
    width: 100%;
    height: 100%;
    background-color: rgb(22, 155, 196);
    color: white;
}

footer {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0,0,0,0.4);
}

footer > p {
    font-weight: 300;
}
</style>
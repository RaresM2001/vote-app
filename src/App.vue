<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>

  :root {
   --primary:  #5b3cc4;
   --dark: #161c2d;
   --danger: #ff4657;
  }

* {
  font-family: Avenir, Helvetica, Arial, sans-serif;

  box-sizing: border-box;
  /* transition: all .4s; */
}

h1.title, h2.title, h3.title, h4.title, h5.title, h6.title {
  color: #2c3e50;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  margin: 0;
  padding: 0;
}

.root {
  width: 100%;
  min-height: 100vh;
  margin: 0;
  padding: 0;
}

.text-centered {
  text-align: center;
}

input, textarea {
  width: 300px;
  margin-left: calc(50% - 150px);
  height: 40px;
  margin-bottom: 35px;
  border: none;
  border-bottom: 2px solid lightgrey;
  padding: 0px -20px 0 20px;
  transition: all .4s;
}

textarea {
  border: 2px solid lightgrey;
  border-radius: 5px;
  height: 200px;
  padding-left: 20px;
  padding-top: 20px;
}

input:focus {
  border-color: var(--primary);
}

.dangerInput {
    border-color: red;
    color: red;
}

button {
  border: none;
  height: 60px;
  color: white;
  background: var(--primary);
  font-weight: bold;
  cursor: pointer;
  transition: all .4s;
  text-transform: uppercase;
}

button:hover {
  background-color: var(--dark);
}

.rounded-btn {
  height: 30px;
  width: 90px;
  border-radius: 15px;
  font-size: .8em;
}

.small-btn {
  width: 300px;
}

.small-btn-centered {
  margin-left: calc(50% - 150px);
}

.big-btn {
  width: 100%;
}

::placeholder {
  /* padding-left: 15px; */
  font-size: 1.1em;
}

.absolute-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}


.light-shadow {
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 1px 1px 10px rgba(0,0,0,0.23);
}
</style>

# screen width media query detect

> $screen Example
## $screen.mobile()
## $screen.tablet()
## $screen.desktop()
## $screen.resize

``` bash
# responsive for DOM
v-if="$screen.resize && $screen.mobile()"
v-show="$screen.resize && $screen.mobile()"

# no-responsive for DOM
v-if="$screen.mobile()"
v-show="$screen.mobile()"

# responsive in JS
computed: {
  mobile() {
    return this.$screen.resize && this.$screen.mobile()
  }
}

# no-responsive in JS
if(this.$screen.mobile){
   doSomething()
}

# watch resize for JS
watch: {
  '$screen.resize'() {
     doSomething()
  }
}

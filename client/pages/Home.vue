<template>
  <div class="my-32">
    <h1 class="text-center text-gray-500">Blog</h1>
    <div class="flex justify-between items-center mx-20 my-32">
      <div v-for="post in allPosts.results" :key="post.id">
        <div>
          {{post.author}}
          {{convertDate(post.created)}}

        </div>
        <div>
          {{post.title}}

        </div>
        <div>
          {{post.content}}

        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data: () => ({
    model: {
      email: '',
      password: '',
    },
  }),
  computed: {
    ...mapState('blog',[
      'allPosts'
    ])
  },
  mounted() {
    this.getAllPosts()
  },
  methods: {
    ...mapActions('blog',[
      'getAllPosts'
    ]),
    convertDate(date) {
      console.log(date)
      const start = new Date(date);
      let year = start.getFullYear();
    let month = (1 + start.getMonth()).toString().padStart(2, '0');
    let day = start.getDate().toString().padStart(2, '0');
  
    return month + '/' + day + '/' + year;
    }
  },
  
}
</script>
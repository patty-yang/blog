[//]: # (# 从头开始，重新出发 🚀)

[//]: # ()

[//]: # (> 📚 **知其然，更要知其所以然**)

[//]: # (>)

[//]: # (> **_深入原理，掌握本质_**)

[//]: # ()

[//]: # (> 💡 **唯有透彻理解，方能游刃有余**)

[//]: # (>)

[//]: # (> **_学习之道，在于求真_**)

[//]: # ()

[//]: # (---)

<!-- 之所以将代码写在 md 里面，而非单独封装为 Vue 组件，因为 aside 不会动态刷新，参考 https://github.com/vuejs/vitepress/issues/2686 -->
<script setup lang="ts">
import {data as posts} from '../utils/posts.data.mjs'; import {computed} from 'vue';

const postGroups = computed(() => {
  const groups = new Map<string, typeof posts>();
  posts.forEach((post) => {
    const title = post.url.split('/')[2];
    if (!groups.has(title)) {
      groups.set(title, []);
    }
    groups.get(title)?.push(post);
  });
  return groups;
});
</script>

<template v-for="[title, postGroup] in postGroups" :key="title">
  <h2 :id="title" class="post-title">
    <a
      class="header-anchor"
      :href="`#${title}`"
      :aria-label="`Permalink to &quot;${title}&quot;`"
      >
    </a>
    <div class="post-title hollow-text source-han-serif">{{ title }}</div>
  </h2>
  <div class="post-container" v-for="post in postGroup" :key="post.url">
    <a :href="post.url">{{ post.title }}</a>
    <span class="post-date">
      {{ post.date.monthDay }}
    </span>
  </div> 
</template>

<style scoped lang="scss">

.post-title {
	margin-bottom: 6px;
	border-top: 0;
	position: relative;
	top: 0;
	left: 0;

	.post-title {
		position: absolute;
		top: -6px;
		left: -10px;

		z-index: -1;
		opacity: .16;
		font-size: 86px;
		font-weight: 900;
	}
}

.post-container {
  display: flex;
  justify-content: space-between;
  margin: 12px 0;

  > a {
		font-weight: 400;
	}

  .post-date {
    opacity: .6;
  }
}

.hollow-text {
  /* 设置文本颜色为透明 */
  color: var(--vp-c-bg);
  -webkit-text-stroke: 1px var(--vp-c-text-1);
}
</style>
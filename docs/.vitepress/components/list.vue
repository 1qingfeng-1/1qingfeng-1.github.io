<!-- <template>
    <ol>
        <li v-for="(item, index) in list" :key="index">
            <ul>
                <li v-for="(subItem, subIndex) in item.items" :key="`sub-${subIndex}`">
                    <ul>
                        <li v-for="(sub1Item, sub1Index) in subItem.items" :key="`sub-${sub1Index}`">
                            <ul>
                            <li v-for="(subSubItem, subSubIndex) in sub1Item.items" :key="`sub-sub-${subSubIndex}`">
                                <span class="date">{{ subSubItem.updateTime }}</span>
                                <a class="tit" :href="subSubItem.link">{{ subSubItem.title || '' }}</a>
                                <span class="tags-wrapper" v-if="subSubItem.tags && subSubItem.tags.length">
                                    <a class="tag" :href="`/tags.html?tag=${tag}`" v-for="tag in subSubItem.tags.split('|')" :key="tag">{{ tag }}</a>
                                </span>
                            </li>
                           
                        </ul>
                    </li> 
                    </ul>
                </li>
            </ul>
        </li>
    </ol>
</template>

<script>
export default {
    name: 'List',
    props: {
        list: {
            type: Array,
            default: [],
        },
    },
};
</script>

<style scoped></style>


 -->


 <template>
    <ol>
      <nested-item v-for="(item, index) in list" :key="index" :item="item"></nested-item>
    </ol>
  </template>
  
  <script setup>
  import { defineProps } from 'vue'
  import NestedItem from './nestedItem.vue'
  
  const props = defineProps({
    list: Array
  })
  </script>

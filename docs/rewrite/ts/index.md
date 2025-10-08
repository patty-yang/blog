## interface type class 的区别

<!--
import { login } from './api'
  let options: Parameters<typeof login>
  let response: ReturnType<typeof login> | null = null
 -->

<!--
  索引字符串带来的问题
  const obj = {
    name: 'name',
    age: 18
  };

  function method(key: string){
      return obj[key]

      // Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ name: string; age: number; }'. No index signature with a parameter of type 'string' was found on type '{ name: string; age: number; }'
  }
 -->

 <!--
 const obj = {
  name: 'name',
  age: 18
};
function method<K extends keyof typeof obj>(key: K): typeof obj[K] {
  return obj[key];
}
  -->
<Gitalk />

## 初识 nest

装饰器是 TypeScript 提供的一种代码注解方式，可以用来修改类的行为。Nest.js 大量使用了装饰器来实现其功能。

主要有以下四种装饰器:

1. 类装饰器 (ClassDecorator)

   - 用于类声明
   - 类装饰器在类声明之前被声明
   - 例如 `@Controller()`, `@Injectable()`

2. 属性装饰器 (PropertyDecorator)

   - 用于类的属性
   - 属性装饰器紧靠在属性声明之前
   - 例如 `@Inject()`, `@Optional()`

3. 方法装饰器 (MethodDecorator)

   - 用于类的方法
   - 方法装饰器紧靠在方法声明之前
   - 例如 `@Get()`, `@Post()`, `@Delete()`

4. 参数装饰器 (ParameterDecorator)
   - 用于类构造函数或方法参数
   - 参数装饰器应用于类构造函数或方法声明
   - 例如 `@Body()`, `@Param()`, `@Query()`

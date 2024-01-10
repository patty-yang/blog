# 忽略错误
set -e

# 构建
npm run build

# 进入待发布的目录
cd .vitepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 如果部署到 https://<USERNAME>.github.io
git push -f git@github.com:xiaoYangHAHAHA/Sum-one.github.io.git master:gh-pages

# 如果是部署到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

cd -
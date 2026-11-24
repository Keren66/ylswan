# ylswan.shop — 静态站交付说明

英文单页企业站，业务参考 ylswan.com（黄天鹅 / 高端可生食鸡蛋），**重写文案、重做视觉**：
配色由参考站的中式黄红改为「奶油白 + 松绿 + 蛋黄」的现代农场高端风，版式全部重排，
没有复制参考站的任何图片、Logo、文案段落。

- 站点域名（规划）：`ylswan.shop`
- 联系邮箱：`info@ylswan.shop`（全站唯一联系方式，出现在联系区、表单提示与页脚）
- 版权行：`© 2026 ylswan.com. All rights reserved.`（按需求写 ylswan.com）

## 目录结构

```
ylswan/
├── index.html          主站（单页长滚动，9 个 section）
├── privacy.html        隐私说明（表单相关，链接在页脚）
├── robots.txt
├── sitemap.xml
├── assets/
│   ├── css/style.css   全部样式，token 在 :root
│   ├── js/main.js      菜单 / 滚动揭示 / FAQ 单开 / 表单假发送
│   └── img/            hero.jpg farm.jpg yolk.jpg facility.jpg（AI 生成，共 968 KB）
└── _build/             构建用提示词与生图脚本，不要上传
```

本地预览：

```bash
cd ylswan && python3 -m http.server 8099
# 打开 http://127.0.0.1:8099/
```

无构建步骤、无依赖、无外部 JS；只有 Google Fonts 一个外链（Fraunces + Inter + JetBrains Mono）。

## 页面骨架

1. Header（sticky，滚动加描边）
2. Hero —「An egg you can eat straight from the shell.」+ 拱形主图 + 38 年标准徽记
3. 事实条 — 0 抗生素 / 沙门氏菌未检出 / 5 个基地 / 20+ 城市
4. Our story — 品牌由来（引进日本标准 → 本地化 → 自有基地）
5. The standard — 4 张卡片（饲料 / 鸡群管理 / 检测 / 风味）+「Read the label」逐条解释 4 个声明
6. Our range — 4 条产品线（Signature / Everyday / Gifting / Foodservice）
7. From farm to shelf — 5 步链路 + 基地列表（6 个地点）+ 分级车间图
8. Our commitments — 深绿承诺带（4 条「不做的事」）
9. FAQ — 5 条，单开手风琴
10. Contact — 邮箱 + 表单（无后端，做完整校验 + 1.5s 发送动画 + 成功提示）
11. Footer — 品牌 / Explore / Business 三列 + 版权行

## 设计 token

| 用途 | 值 | 说明 |
|---|---|---|
| 纸白 | `#FBFAF6` | 页面底色 |
| 次级底 | `#F3F1E8` | 交替区块、联系区 |
| 主色 | `#1E3D34`（松绿） | 按钮、页脚、深色带 |
| 强调 | `#E3A63C`（蛋黄） | 仅用于深色底、装饰、大字号 |
| 小字黄 | `#8F5C0E` | 纸白底上的 eyebrow / 小字，5.43:1 |
| 正文 | `#3D4A42` / 弱化 `#5C6A61` | 8.91:1 / 5.45:1 |

字体：Fraunces（衬线标题）、Inter（正文）、JetBrains Mono（标签）。签名元素是
「天鹅颈拱形」图片裁切 + 蛋形内嵌 S 曲线 Logo。

## 内容来源与需核实的项

以下事实取自 ylswan.com 公开页面（品牌故事 / 关于我们 / 品牌特色），英文重写：

- 引进日本 38 年可生食鸡蛋标准，牵头国内《可生食鸡蛋》团体标准
- 五个养殖基地：四川绵阳、广西北海、宁夏固原、浙江长兴、新疆布尔津；湖北黄冈分级中心
- 北京 / 上海 / 深圳 / 广州 / 成都 / 杭州等 20+ 城市高端商超
- 专用饲料（玉米、大豆粕、万寿菊提取物 + 益生菌）；黄芪多糖等中草药，不使用抗生素
- 沙门氏菌经第三方检测未检出；蛋黄叶黄素、无腥味

**上线前请客户确认（现在写的是中性表述，未编造）：**

1. 公司法定英文名 —— 目前全站只用品牌名「YLSWAN」，没有写注册公司名。
2. 「38 years」指日本标准的历史，不是本公司历史，页面已按此表述（Hero 徽记 + 关于我们段落）。
3. 产品规格（10/20/30 枚、12/30 枚、整箱）为参考站包装梯度，若实际 SKU 不同需替换。
4. 表单没有后端，提交只做动画确认；若要真收信，需接 API（如 SES / Formspree）或改为 mailto。
5. 页面未放任何认证徽章、客户 Logo、销量数字——没有的事实一律不写。

## v2 文案精简

全站文案压缩约一半：各段改为一句话，「Read the label」只留粗体结论，承诺带只留 4 条标题，FAQ 答案缩成 1–2 句。原版备份在 `../ylswan-backup-before-trim/`。

## 验收记录（实测，非估计）

- 宽度矩阵 1440 / 1180 / 1024 / 900 / 768 / 430 / 390 / 360：横向溢出全部 ≤ 0
- 4 张图片全部加载，无 404；`figure` 已归零 margin，图片无错位
- 对比度扫描：0 处低于 WCAG AA
- 字体三族均加载成功（Fraunces / Inter / JetBrains Mono）
- 锚点：全部站内锚点可达，无死链
- 滚动揭示：27/27 元素正常显示（scroll + rAF，不依赖 IntersectionObserver）
- 交互路径：移动菜单开 / 合 / Esc / 点链接收起（390 宽实测）、FAQ 单开、表单空提交 3 处报错、有效提交走发送态 → 成功条 → 表单重置
- 页脚版权行实测渲染为 `© 2026 ylswan.com. All rights reserved.`
- 全站 grep 无占位串（lorem / TODO / example.com / 待填）

## 上线选项

改完 CSS / JS 记得升 `?v=`（现在是 `v=2`）。

1. **S3 + CloudFront（推荐）**
   ```bash
   aws s3 sync . s3://<bucket> --delete --exclude "_build/*" --exclude "*.md"
   # HTML: cache-control max-age=60, assets/*: max-age=31536000,immutable
   ```
2. **Nginx**：站点根指向本目录，`index index.html;`
3. **GitHub Pages**：推仓库开 Pages，删掉 `_build/` 与 README 不影响运行
4. 域名 `ylswan.shop` 需在 DNS 侧指向 CloudFront / 服务器，HTTPS 证书用 ACM 或 Let's Encrypt

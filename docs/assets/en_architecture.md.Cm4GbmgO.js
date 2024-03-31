import{_ as e}from"./chunks/layout.9QRJfi6n.js";import{_ as a,c as n,o as s,a4 as o}from"./chunks/framework.4aTu-Nia.js";const b=JSON.parse('{"title":"Nunu架构详解","description":"","frontmatter":{},"headers":[],"relativePath":"en/architecture.md","filePath":"en/architecture.md","lastUpdated":null}'),l={name:"en/architecture.md"},i=o('<h1 id="nunu架构详解" tabindex="-1">Nunu架构详解 <a class="header-anchor" href="#nunu架构详解" aria-label="Permalink to &quot;Nunu架构详解&quot;">​</a></h1><p>Nunu采用了经典的分层架构。同时，为了更好地实现模块化和解耦，采用了依赖注入框架<code>Wire</code>。</p><p><img src="'+e+`" alt="Nunu Layout"></p><h2 id="目录结构" tabindex="-1">目录结构 <a class="header-anchor" href="#目录结构" aria-label="Permalink to &quot;目录结构&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>.</span></span>
<span class="line"><span>├── api</span></span>
<span class="line"><span>│   └── v1</span></span>
<span class="line"><span>├── cmd</span></span>
<span class="line"><span>│   ├── migration</span></span>
<span class="line"><span>│   ├── server</span></span>
<span class="line"><span>│   │   ├── wire</span></span>
<span class="line"><span>│   │   │   ├── wire.go</span></span>
<span class="line"><span>│   │   │   └── wire_gen.go</span></span>
<span class="line"><span>│   │   └── main.go</span></span>
<span class="line"><span>│   └── task</span></span>
<span class="line"><span>├── config</span></span>
<span class="line"><span>├── deploy</span></span>
<span class="line"><span>├── docs</span></span>
<span class="line"><span>├── internal</span></span>
<span class="line"><span>│   ├── handler</span></span>
<span class="line"><span>│   ├── middleware</span></span>
<span class="line"><span>│   ├── model</span></span>
<span class="line"><span>│   ├── repository</span></span>
<span class="line"><span>│   ├── server</span></span>
<span class="line"><span>│   └── service</span></span>
<span class="line"><span>├── pkg</span></span>
<span class="line"><span>├── scripts</span></span>
<span class="line"><span>├── test</span></span>
<span class="line"><span>│   ├── mocks</span></span>
<span class="line"><span>│   └── server</span></span>
<span class="line"><span>├── web</span></span>
<span class="line"><span>├── Makefile</span></span>
<span class="line"><span>├── go.mod</span></span>
<span class="line"><span>└── go.sum</span></span></code></pre></div><ul><li><code>cmd</code>：应用程序的入口，包含了不同的子命令。</li><li><code>config</code>：配置文件。</li><li><code>deploy</code>：部署相关的文件，如 Dockerfile 、 docker-compose.yml等。</li><li><code>internal</code>：应用程序的主要代码，按照分层架构进行组织。</li><li><code>pkg</code>：公共的代码，包括配置、日志、HTTP 等。</li><li><code>script</code>：脚本文件，用于部署和其他自动化任务。</li><li><code>storage</code>：存储文件，如日志文件。</li><li><code>test</code>：测试代码。</li><li><code>web</code>：前端代码。</li></ul><h2 id="internal" tabindex="-1">internal <a class="header-anchor" href="#internal" aria-label="Permalink to &quot;internal&quot;">​</a></h2><ul><li><code>internal/handler</code>（ or <code>controller</code>）：处理 HTTP 请求，调用业务逻辑层的服务，返回 HTTP 响应。</li><li><code>internal/server</code>（or <code>router</code>）：HTTP 服务器，启动 HTTP 服务，监听端口，处理 HTTP 请求。</li><li><code>internal/service</code>（or <code>logic</code>）：服务，实现具体的业务逻辑，调用数据访问层repository。</li><li><code>internal/model</code>（or <code>entity</code>）：数据模型，定义了业务逻辑层需要的数据结构。</li><li><code>internal/repository</code>（or <code>dao</code>）：数据访问对象，封装了数据库操作，提供了对数据的增删改查。</li></ul><h2 id="依赖注入" tabindex="-1">依赖注入 <a class="header-anchor" href="#依赖注入" aria-label="Permalink to &quot;依赖注入&quot;">​</a></h2><p>本项目采用了依赖注入框架<code>Wire</code>，实现了模块化和解耦。<code>Wire</code>通过预编译<code>wire.go</code>，自动生成依赖注入的代码<code>wire_gen.go</code>，简化了依赖注入的过程。</p><ul><li><code>cmd/job/wire.go</code>：<code>Wire</code>配置文件，定义了<code>job</code>子命令需要的依赖关系。</li><li><code>cmd/migration/wire.go</code>：<code>Wire</code>配置文件，定义了<code>migration</code>子命令需要的依赖关系。</li><li><code>cmd/server/wire.go</code>：<code>Wire</code>配置文件，定义了<code>server</code>子命令需要的依赖关系。</li></ul><p>Wire官方文档：<a href="https://github.com/google/wire/blob/main/docs/guide.md" target="_blank" rel="noreferrer">https://github.com/google/wire/blob/main/docs/guide.md</a></p><p>注意：<code>wire_gen.go</code>文件为自动编译生成，禁止手动修改</p><h2 id="公共代码" tabindex="-1">公共代码 <a class="header-anchor" href="#公共代码" aria-label="Permalink to &quot;公共代码&quot;">​</a></h2><p>为了实现代码的复用和统一管理，本项目采用了公共代码的方式，将一些通用的代码放在了<code>pkg</code>目录下。</p><ul><li><code>pkg/config</code>：配置文件的读取和解析。</li><li><code>pkg/helper</code>：一些通用的辅助函数，如 MD5 加密、UUID 生成等。</li><li><code>pkg/http</code>：HTTP 相关的代码，如 HTTP 客户端、HTTP 服务器等。</li><li><code>pkg/log</code>：日志相关的代码，如日志的初始化、日志的写入等。</li><li><code>more...</code>：当然，你可以自由添加扩展更多的pkg。</li></ul>`,16),c=[i];function p(d,r,t,u,h,g){return s(),n("div",null,c)}const k=a(l,[["render",p]]);export{b as __pageData,k as default};
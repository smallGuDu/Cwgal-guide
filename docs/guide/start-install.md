# 快速开始

本文将指导你从零开始安装并运行 **Cwgal**，以及配置 NapCat（OneBot V11 实现）与后端建立连接。

---

## 环境要求

- **Node.js**：暂不需要，后端使用 Python
- **Python 3.8+** 及 pip
- **NapCat**：QQ 机器人框架（支持 OneBot V11 协议）
- 一个可正常收发消息的 QQ 帐号

---

## 第一步：下载项目

### 方式一：直接下载 ZIP

访问项目仓库（https://github.com/smallgudu/Cwgal），点击 **Code → Download ZIP**，解压到本地文件夹。

### 方式二：使用 Git 克隆

```bash
git clone https://github.com/smallgudu/Cwgal.git
cd Qwgal
```

---

## 第二步：安装 Python 依赖

项目只需要 `fastapi`、`uvicorn` 和 `websockets`（FastAPI 自带）。在项目根目录下执行：

```bash
pip install fastapi uvicorn
```

> **注意**：无需安装 `websockets`，FastAPI 已包含 WebSocket 支持。

---

## 第三步：配置文件 `config.json`

在项目根目录创建 `config.json`，内容如下（请根据实际情况修改）：
```json
{
  "backend": {
    "type": "onebot_v11",
    "ws_path": "/onebot/v11/ws",
    "token": "your_secure_token_here"
  },
  "frontend": {
    "ws_path": "/ws/frontend"
  },
  "app": {
    "static_dir": "static",
    "host": "0.0.0.0",
    "port": 8765
  },
  //实际上game不用修改,它只是默认值,你可以在后续界面改动
  "game": {
    "characters": {
      "示例学妹": {
        "qq": "123456",
        "image": "https://i.imgur.com/VvYQJQx.png"
      },
      "示例学姐": {
        "qq": "654321",
        "image": "https://i.imgur.com/y6yE8jM.png"
      }
    },
    "scenes": {
      "教室": "https://example.com/classroom.jpg",
      "海边": "https://example.com/beach.jpg"
    },
    "default_scene": "教室"
  }
}
```

### 配置项说明

| 字段 | 含义 | 示例 |
|------|------|------|
| `backend.ws_path` | 后端接收 NapCat 连接的 WebSocket 路径 | `/onebot/v11/ws` |
| `backend.token` | 可选，NapCat 连接时需要携带的 Bearer Token | `"your_secure_token_here"` |
| `frontend.ws_path` | 前端页面（浏览器）连接后端的路径 | `/ws/frontend` |
| `app.port` | 后端服务监听的端口 | `8765` |
| `app.host` | 监听地址，`0.0.0.0` 表示允许外部访问 | `0.0.0.0` |
| `game.characters` | 角色列表，键为角色名，值为该角色绑定的 QQ 号和立绘图片地址 | 见上 |
| `game.scenes` | 场景列表，键为场景名，值为背景图片 URL | 见上 |

> **图片路径**：可以将图片放在 `img/BG/` 和 `img/character/` 目录下，然后使用 `/img/BG/xxx.jpg` 或 `/img/character/yyy.png` 作为 URL。后端会自动挂载这些静态目录。

---

## 第四步：准备静态文件与图片目录

1. 在项目根目录创建 `static` 文件夹，将 `index.html`（前端界面）放入其中。  
2. 创建 `img/BG` 和 `img/character` 文件夹，放入你的背景图和角色立绘。

目录结构示例：

```
galgame-qq-engine/
├── main.py
├── config.json
├── static/
│   └── index.html
├── img/
│   ├── BG/
│   │   └── classroom.jpg
│   └── character/
│       └── heroine.png
└── ...
```

> **提示**：`index.html` 文件可以从项目附带的代码中获取，或者使用本文档最后提供的完整版本。

---

## 第五步：启动后端服务

在项目根目录下运行：

```bash
python main.py
```

如果一切正常，你会看到类似输出：

```
INFO:     Started server process [12345]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:8765 (Press CTRL+C to quit)
```

此时后端已经就绪，等待 NapCat 连接。

---

## 第六步：配置 NapCat（OneBot V11 客户端）

[NapCat](https://github.com/NapNeko/NapCatQQ) 是一个强大的 QQ 机器人框架，支持 OneBot V11 协议。下面以 **反向 WebSocket** 方式连接我们的后端。

### 1. 获取 NapCat

- 前往 [NapCat 发布页](https://github.com/NapNeko/NapCatQQ/releases) 下载适合你系统的版本（Windows 用 `.exe`，Linux 用二进制）。
- 解压后运行一次，会自动生成配置文件。

### 2. 登录 QQ 帐号

运行 NapCat，根据提示扫码登录你想要作为机器人的 QQ 帐号。

### 3. 添加反向 WebSocket 客户端

- 打开 NapCat 的 WebUI 管理面板（默认地址 `http://127.0.0.1:6099`）。
- 在左侧菜单找到 **“网络配置”**（Network Config）。
- 点击 **“添加配置”**，类型选择 **`WebSocket 客户端`**。
- 勾选 **“启用”**。
- 在 **URL** 字段填写：
  ```
  ws://你的后端IP:8765/onebot/v11/ws
  ```
  例如后端和 NapCat 在同一台机器上：`ws://127.0.0.1:8765/onebot/v11/ws`
- 如果你在 `config.json` 中设置了 `backend.token`，则在 NapCat 中也要填写相同的 **Access Token**。
- 点击保存，NapCat 会立即尝试连接。

### 4. 验证连接

回到运行 `main.py` 的终端，如果看到输出：

```
NapCat 已连接
```

说明连接成功！现在 NapCat 会将收到的 QQ 消息推送给后端，后端再广播到前端页面。

---

## 第七步：前端访问

打开浏览器，访问：

```
http://你的后端IP:8765
```

例如本机访问：`http://127.0.0.1:8765`

你应该能看到 Galgame 风格的聊天界面。接下来：

1. **填写你的 QQ 号**：在顶栏的「我的QQ」输入框中填入你自己的 QQ 号（用于本地回显时显示你的立绘）。
2. **连接会话**：选择私聊或群聊，输入对方的 QQ 号或群号，点击「连接会话」。
3. **发送消息**：在底部输入框输入文字，按回车或点击发送，消息会通过 NapCat 发到 QQ，同时本地会立即显示一条“你”的消息，并触发立绘。
4. **自动立绘切换**：任何人说话（包括你自己），只要其 QQ 号绑定了角色，该角色就会自动显示在对应侧（左侧或右侧）。
5. **立绘操作**：
   - **拖拽**：按住立绘图片拖动可调整位置，松开自动保存。
   - **滚轮缩放**：鼠标放在立绘上滚动滚轮可放大/缩小。
   - **模式切换**：点击底部 `Focus` / `Single` / `Multi` 按钮切换高亮模式。

---

## 常见问题

### Q：NapCat 连接失败，终端没有显示“NapCat 已连接”

- 检查 `config.json` 中的 `backend.ws_path` 是否与 NapCat 配置的 URL 路径一致（必须完全匹配）。
- 确认后端端口 `8765` 没有被防火墙阻挡。
- 检查 NapCat 配置中的 Access Token 是否与 `config.json` 中的 `backend.token` 一致（如果设置了的话）。

### Q：前端无法连接 WebSocket

- 打开浏览器控制台（F12），查看是否有连接错误。确保你访问的是 `http://` 而不是 `https://`（除非你配置了 SSL）。
- 确认 `frontend.ws_path` 与前端代码中的 WebSocket 路径一致（默认为 `/ws/frontend`）。

### Q：消息发出去但没有立绘显示

- 检查角色的 `qq` 字段是否与发言者的 QQ 号完全一致（字符串匹配）。
- 确认立绘图片 URL 可以正常访问（如果使用本地图片，确保 `img/character/` 目录存在且图片文件名正确）。

### Q：立绘位置/缩放无法保存

- 拖拽或缩放后，会弹出一个提示“已保存”。如果没出现提示，请检查浏览器控制台是否有报错。
- 位置数据保存在浏览器的 `localStorage` 中，清除浏览器数据会导致重置。

### Q：如何更换背景？

- 方法一：按 `F2` 打开编辑器，在「背景切换」区域点击任意背景图片名即可。
- 方法二：将背景图片放入 `img/BG/`，刷新背景列表后点击。


**Cwgal视觉小说引擎** 让你在聊天中体验 Galgame 般的沉浸感。如果有任何问题，欢迎提交 Issue 或加入我们的交流群q(971124578)。
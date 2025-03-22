# 贡献指南

感谢您考虑为 PixPet 项目做出贡献！以下是参与该项目的一些指南。

## 行为准则

请阅读并遵守我们的[行为准则](CODE_OF_CONDUCT.md)。

## 如何贡献

### 报告问题

如果您发现了问题或有功能请求，请使用 GitHub Issues 提交，并确保：

1. 检查是否已存在相似的问题或请求
2. 提供详细描述，包括如何重现该问题
3. 包含相关的日志和截图
4. 说明您的环境信息（浏览器、操作系统等）

### 提交代码变更

1. Fork 该仓库
2. 创建您的功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的更改 (`git commit -m '添加一些很棒的功能'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个 Pull Request

### Pull Request 流程

1. 确保与主分支保持同步
2. 确保您的代码通过所有测试
3. 更新文档以反映您的更改
4. 填写 Pull Request 模板
5. 请求至少一位维护者进行代码审查

## 开发指南

### 环境设置

按照 README.md 中的安装说明进行设置。本项目使用pnpm作为包管理工具。

### 代码风格

我们使用 ESLint 和 Prettier 来确保代码质量和一致性：

```bash
# 运行代码检查
pnpm lint

# 自动修复代码问题
pnpm lint:fix

# 格式化代码
pnpm format
```

### 提交消息规范

我们遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范，格式如下：

```
<类型>[可选作用域]: <描述>

[可选正文]

[可选页脚]
```

类型包括：

- `feat`: 新功能
- `fix`: 修复
- `docs`: 文档更改
- `style`: 不影响代码含义的更改（空格、格式等）
- `refactor`: 既不修复错误也不添加功能的代码更改
- `perf`: 提高性能的代码更改
- `test`: 添加或修改测试
- `chore`: 对构建过程或辅助工具的更改

### 分支策略

- `main`: 产品就绪代码
- `develop`: 开发中的代码
- `feature/*`: 新功能
- `bugfix/*`: 错误修复
- `hotfix/*`: 紧急修复

## 项目结构

请熟悉 README.md 中描述的项目结构，并遵循现有的模式和组织方式。

## 测试

添加或修改代码时，请包含适当的测试：

```bash
# 运行测试
pnpm test

# 运行带有覆盖率报告的测试
pnpm test -- --coverage
```

## 文档

代码贡献应该包括相应的文档更新。这可能包括：

- 内联代码注释
- README 更新
- 组件文档或示例

## 许可证

通过贡献，您同意您的贡献将在项目的 MIT 许可下发布。

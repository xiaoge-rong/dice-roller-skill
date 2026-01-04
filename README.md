# 🎲 掷骰子技能 (Dice Roller Skill)

一个功能强大的掷骰子技能，支持多种骰子类型和自定义参数，适用于游戏、决策和娱乐场景。

## ✨ 特性

- **多种骰子类型**: 支持任意面的骰子 (d2, d4, d6, d8, d10, d12, d20, d100 等)
- **灵活的表示法**: 使用标准 RPG 骰子表示法 (如 "2d6+3", "1d20", "3d8-1")
- **批量掷骰**: 支持同时掷多个骰子组合
- **详细结果**: 提供每次掷骰的详细分解和总计
- **错误处理**: 智能的错误提示和参数验证
- **快捷方式**: 常用骰子的快速调用方法

## 🚀 快速开始

### Node.js 环境

```javascript
const DiceRoller = require('./index.js');

// 创建实例
const roller = new DiceRoller();

// 基本的掷骰子
const result = roller.roll('2d6+3');
console.log(result);

// 输出示例:
// {
//   success: true,
//   notation: '2d6+3',
//   rolls: [4, 5],
//   total: 12,
//   modifier: '+3',
//   breakdown: '4 + 5 + 3 = 9 + 3 = 12',
//   timestamp: '2026-01-04T02:59:57.000Z'
// }
```

### 浏览器环境

```html
<script src="index.js"></script>
<script>
    const roller = new DiceRoller();
    const result = roller.roll('1d20');
    console.log(result);
</script>
```

## 🎯 使用方法

### 基础语法

使用标准骰子表示法：`[数量]d[面数][+/-修正值]`

- `1d6` - 掷一个6面骰子
- `2d8` - 掷两个8面骰子
- `1d20+5` - 掷一个20面骰子并加5
- `3d6-2` - 掷三个6面骰子并减2
- `d100` - 掷一个100面骰子（数量可省略）

### API 方法

#### `roll(notation)`
掷骰子的主要方法。

```javascript
const result = roller.roll('4d6+2');
if (result.success) {
    console.log(`掷骰结果: ${result.total}`);
    console.log(`详细分解: ${result.breakdown}`);
} else {
    console.error(`错误: ${result.error}`);
}
```

#### `rollMultiple(notations)`
同时掷多个骰子组合。

```javascript
const results = roller.rollMultiple(['1d20', '2d6', '1d4+1']);
results.forEach(result => {
    console.log(`${result.notation}: ${result.total}`);
});
```

#### 快捷方法

```javascript
// 掷D6（六面骰）
const d6 = roller.rollD6();          // 1d6
const d6x3 = roller.rollD6(3);       // 3d6

// 掷D20（二十面骰）
const d20 = roller.rollD20();        // 1d20

// 掷D100（百面骰）
const d100 = roller.rollD100();      // 1d100
```

#### 获取技能信息

```javascript
const info = roller.getInfo();
console.log(`技能名称: ${info.name}`);
console.log(`版本: ${info.version}`);
console.log(`描述: ${info.description}`);
```

## 📊 结果格式

成功结果的格式：

```json
{
    "success": true,
    "notation": "2d6+3",
    "rolls": [4, 5],
    "total": 12,
    "modifier": "+3",
    "breakdown": "4 + 5 + 3 = 9 + 3 = 12",
    "timestamp": "2026-01-04T02:59:57.000Z"
}
```

错误结果的格式：

```json
{
    "success": false,
    "error": "无效的骰子表示法: 2x6",
    "notation": "2x6",
    "timestamp": "2026-01-04T02:59:57.000Z"
}
```

## 🔧 参数限制

为确保性能和合理性，有以下参数限制：

- **骰子数量**: 1-100 个
- **骰子面数**: 2-1000 面
- **修正值范围**: 0-100
- **表示法格式**: 必须符合 `[数量]d[面数][+/-修正值]` 格式

## 🎮 使用场景

- **角色扮演游戏 (RPG)**: 龙与地下城、Pathfinder 等
- **桌面游戏**: 各种需要掷骰子的游戏
- **决策工具**: 随机选择和决策
- **教学演示**: 概率和统计教学
- **娱乐应用**: 休闲游戏和娱乐工具

## 🛡️ 错误处理

技能提供智能的错误处理：

```javascript
// 无效的面数
roller.roll('1d1');     // 错误: 骰子面数必须在 2-1000 之间

// 格式错误
roller.roll('2x6');     // 错误: 无效的骰子表示法

// 数量过多
roller.roll('101d6');   // 错误: 骰子数量必须在 1-100 之间
```

## 🔗 集成示例

### 完整的游戏集成

```javascript
// 创建角色属性
function generateCharacter() {
    const roller = new DiceRoller();
    const stats = {};
    
    const abilities = ['力量', '敏捷', '体质', '智力', '感知', '魅力'];
    
    abilities.forEach(ability => {
        // 4d6 取最好的3个
        const roll4d6 = roller.roll('4d6');
        const best3 = roll4d6.rolls
            .sort((a, b) => b - a)
            .slice(0, 3)
            .reduce((sum, val) => sum + val, 0);
        
        stats[ability] = best3;
    });
    
    return stats;
}

const character = generateCharacter();
console.log('角色属性:', character);
```

## 📈 性能

- 单次掷骰子操作通常在 1ms 内完成
- 支持批量处理，100 个骰子同时掷出也不会超过 10ms
- 内存占用极小，适合高频率调用

## 🤝 贡献

欢迎提交问题报告和功能请求！请随时为这个技能贡献您的想法和改进。

## 📄 许可证

MIT 许可证 - 详情请参见 LICENSE 文件。

## 🎯 更新日志

### v1.0.0 (2026-01-04)
- ✨ 初始版本发布
- 🎲 支持标准骰子表示法
- 📊 详细的结果分解
- 🔧 完整的错误处理
- ⚡ 高性能运算

---

**享受掷骰子的乐趣吧！** 🎲✨
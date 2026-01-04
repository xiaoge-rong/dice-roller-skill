/**
 * Dice Roller Skill - 掷骰子技能
 * 支持多种骰子类型和自定义参数
 */

class DiceRoller {
    constructor() {
        this.name = 'Dice Roller';
        this.version = '1.0.0';
        this.description = '一个强大的掷骰子技能，支持多种骰子类型';
    }

    /**
     * 掷骰子核心函数
     * @param {string} diceNotation - 骰子表示法，例如 "2d6+3", "1d20", "3d8-1"
     * @returns {object} 包含结果和详细信息的对象
     */
    roll(diceNotation = '1d6') {
        try {
            // 解析骰子表示法
            const parsed = this.parseDiceNotation(diceNotation);
            if (!parsed) {
                throw new Error(`无效的骰子表示法: ${diceNotation}`);
            }

            const { count, sides, modifier, modifierType } = parsed;
            
            // 掷骰子
            const rolls = [];
            let total = 0;
            
            for (let i = 0; i < count; i++) {
                const roll = Math.floor(Math.random() * sides) + 1;
                rolls.push(roll);
                total += roll;
            }

            // 应用修正值
            const modifierValue = modifier || 0;
            if (modifierType === '+') {
                total += modifierValue;
            } else if (modifierType === '-') {
                total -= modifierValue;
            }

            return {
                success: true,
                notation: diceNotation,
                rolls: rolls,
                total: total,
                modifier: modifier ? `${modifierType}${modifier}` : null,
                breakdown: this.getBreakdown(rolls, modifier, modifierType),
                timestamp: new Date().toISOString()
            };

        } catch (error) {
            return {
                success: false,
                error: error.message,
                notation: diceNotation,
                timestamp: new Date().toISOString()
            };
        }
    }

    /**
     * 解析骰子表示法
     * @param {string} notation - 例如 "2d6+3", "1d20", "3d8-1"
     * @returns {object|null} 解析后的对象
     */
    parseDiceNotation(notation) {
        // 匹配模式: XdY+Z 或 XdY-Z 或 XdY 或 dY
        const pattern = /^(?:(\d+)d)?(\d+)([+-]\d+)?$/i;
        const match = notation.match(pattern);
        
        if (!match) return null;

        const count = match[1] ? parseInt(match[1]) : 1; // 默认1个骰子
        const sides = parseInt(match[2]);
        const modifierPart = match[3];
        
        let modifier = null;
        let modifierType = null;
        
        if (modifierPart) {
            modifierType = modifierPart[0]; // '+' 或 '-'
            modifier = parseInt(modifierPart.substring(1));
        }

        // 验证参数
        if (count < 1 || count > 100) return null; // 最多100个骰子
        if (sides < 2 || sides > 1000) return null; // 2-1000面
        if (modifier && (modifier < 0 || modifier > 100)) return null; // 修正值范围

        return { count, sides, modifier, modifierType };
    }

    /**
     * 生成详细分解
     */
    getBreakdown(rolls, modifier, modifierType) {
        let breakdown = `${rolls.join(' + ')}`;
        
        if (modifier && modifier > 0) {
            breakdown += ` ${modifierType} ${modifier}`;
        }
        
        const sum = rolls.reduce((a, b) => a + b, 0);
        if (modifier && modifier > 0) {
            const finalModifier = modifierType === '+' ? modifier : -modifier;
            breakdown += ` = ${sum} ${modifierType} ${modifier} = ${sum + finalModifier}`;
        } else {
            breakdown += ` = ${sum}`;
        }
        
        return breakdown;
    }

    /**
     * 批量掷骰子
     * @param {array} notations - 骰子表示法数组
     * @returns {array} 结果数组
     */
    rollMultiple(notations) {
        return notations.map(notation => this.roll(notation));
    }

    /**
     * 常用骰子快捷方式
     */
    rollD6(count = 1) {
        return this.roll(`${count}d6`);
    }

    rollD20() {
        return this.roll('1d20');
    }

    rollD100() {
        return this.roll('1d100');
    }

    /**
     * 获取技能信息
     */
    getInfo() {
        return {
            name: this.name,
            version: this.version,
            description: this.description
        };
    }
}

// 使用示例
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DiceRoller;
}

// 浏览器环境
if (typeof window !== 'undefined') {
    window.DiceRoller = DiceRoller;
}
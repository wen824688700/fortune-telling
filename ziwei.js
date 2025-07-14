// 紫微斗数页面脚本
document.addEventListener('DOMContentLoaded', function() {
    // 初始化表单提交处理
    initFormSubmit();
    
    // 初始化宫位标签切换
    initPalaceTabs();
    
    // 初始化结果操作按钮
    initResultActions();
});

// 表单提交处理
function initFormSubmit() {
    const ziweiForm = document.getElementById('ziweiForm');
    if (!ziweiForm) return;
    
    ziweiForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 显示加载动画
        showLoadingAnimation();
        
        // 获取表单数据
        const formData = new FormData(ziweiForm);
        const userData = {
            name: formData.get('name'),
            gender: formData.get('gender'),
            birthyear: formData.get('birthyear'),
            birthmonth: formData.get('birthmonth'),
            birthday: formData.get('birthday'),
            birthhour: formData.get('birthhour'),
            precise_time: formData.get('precise_time') === 'on'
        };
        
        // 模拟API调用延迟
        setTimeout(() => {
            // 处理结果
            processResult(userData);
            
            // 隐藏加载动画，显示结果
            hideLoadingAnimation();
            showResult();
        }, 3000);
    });
}

// 显示加载动画
function showLoadingAnimation() {
    const loadingAnimation = document.getElementById('loadingAnimation');
    if (loadingAnimation) {
        loadingAnimation.style.display = 'block';
    }
}

// 隐藏加载动画
function hideLoadingAnimation() {
    const loadingAnimation = document.getElementById('loadingAnimation');
    if (loadingAnimation) {
        loadingAnimation.style.display = 'none';
    }
}

// 显示结果
function showResult() {
    const resultPanel = document.getElementById('ziweiResult');
    if (resultPanel) {
        resultPanel.style.display = 'block';
        
        // 平滑滚动到结果区域
        resultPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// 处理结果数据
function processResult(userData) {
    // 填充基本信息
    document.getElementById('resultName').textContent = userData.name;
    document.getElementById('resultGender').textContent = userData.gender === 'male' ? '男' : '女';
    
    // 模拟阳历转换
    const solarDate = convertToSolar(userData);
    document.getElementById('resultSolar').textContent = solarDate;
    
    // 农历日期
    const lunarDate = formatLunarDate(userData);
    document.getElementById('resultLunar').textContent = lunarDate;
    
    // 命主和身主
    document.getElementById('resultMaster').textContent = '紫微星';
    document.getElementById('resultBody').textContent = '天机星';
    
    // 更新命盘中心信息
    updateChartCenterInfo(userData);
}

// 格式化农历日期
function formatLunarDate(userData) {
    const yearMap = {
        '2024': '甲辰',
        '2023': '癸卯',
        '2022': '壬寅',
        '2021': '辛丑',
        '2020': '庚子',
        // 可以根据需要添加更多年份
    };
    
    const monthNames = ['正', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'];
    const hourNames = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
    
    const year = yearMap[userData.birthyear] || userData.birthyear + '年';
    const month = monthNames[parseInt(userData.birthmonth) - 1] || userData.birthmonth;
    const day = userData.birthday;
    const hour = hourNames[parseInt(userData.birthhour) - 1] || userData.birthhour;
    
    return `${year}年${month}月${day}日 ${hour}时`;
}

// 模拟阳历转换
function convertToSolar(userData) {
    // 这里应该是实际的阳历转换算法
    // 现在只是简单模拟一个结果
    const monthMap = {
        '1': '2月初',
        '2': '3月初',
        '3': '4月初',
        '4': '5月初',
        '5': '6月初',
        '6': '7月初',
        '7': '8月初',
        '8': '9月初',
        '9': '10月初',
        '10': '11月初',
        '11': '12月初',
        '12': '1月初',
    };
    
    const hourMap = {
        '1': '23:00-01:00',
        '2': '01:00-03:00',
        '3': '03:00-05:00',
        '4': '05:00-07:00',
        '5': '07:00-09:00',
        '6': '09:00-11:00',
        '7': '11:00-13:00',
        '8': '13:00-15:00',
        '9': '15:00-17:00',
        '10': '17:00-19:00',
        '11': '19:00-21:00',
        '12': '21:00-23:00',
    };
    
    const month = monthMap[userData.birthmonth] || userData.birthmonth + '月';
    const hour = hourMap[userData.birthhour] || userData.birthhour + '时';
    
    return `${userData.birthyear}年${month} ${hour}`;
}

// 更新命盘中心信息
function updateChartCenterInfo(userData) {
    const yearInfo = document.querySelector('.center-content .year-info');
    const personInfo = document.querySelector('.center-content .person-info');
    const birthInfo = document.querySelector('.center-content .birth-info');
    
    if (yearInfo) {
        const yearMap = {
            '2024': '甲辰年 (2024)',
            '2023': '癸卯年 (2023)',
            '2022': '壬寅年 (2022)',
            '2021': '辛丑年 (2021)',
            '2020': '庚子年 (2020)',
            // 可以根据需要添加更多年份
        };
        yearInfo.textContent = yearMap[userData.birthyear] || `${userData.birthyear}年`;
    }
    
    if (personInfo) {
        personInfo.textContent = userData.name;
    }
    
    if (birthInfo) {
        const monthNames = ['正', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'];
        const hourNames = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
        
        const month = monthNames[parseInt(userData.birthmonth) - 1] || userData.birthmonth;
        const hour = hourNames[parseInt(userData.birthhour) - 1] || userData.birthhour;
        
        birthInfo.textContent = `农历${month}月${userData.birthday}日 ${hour}时`;
    }
}

// 初始化宫位标签切换
function initPalaceTabs() {
    const tabs = document.querySelectorAll('.palace-tabs .tab');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const palace = this.getAttribute('data-palace');
            
            // 移除所有标签的活动状态
            tabs.forEach(t => t.classList.remove('active'));
            
            // 添加当前标签的活动状态
            this.classList.add('active');
            
            // 隐藏所有内容
            const contents = document.querySelectorAll('.palace-content');
            contents.forEach(content => content.style.display = 'none');
            
            // 显示对应内容
            const activeContent = document.querySelector(`.palace-content[data-palace="${palace}"]`);
            if (activeContent) {
                activeContent.style.display = 'block';
            }
            
            // 高亮对应的命盘宫位
            highlightPalace(palace);
        });
    });
}

// 高亮命盘中的宫位
function highlightPalace(palace) {
    // 移除所有宫位的高亮
    const cells = document.querySelectorAll('.chart-cell');
    cells.forEach(cell => {
        cell.style.boxShadow = '';
        cell.style.zIndex = '';
        cell.style.transform = '';
        cell.style.background = '';
    });
    
    // 添加当前宫位的高亮
    const activeCell = document.querySelector(`.chart-cell[data-palace="${palace}"]`);
    if (activeCell) {
        activeCell.style.boxShadow = '0 0 20px rgba(107, 70, 193, 0.8)';
        activeCell.style.zIndex = '10';
        activeCell.style.transform = 'scale(1.05)';
        activeCell.style.background = 'rgba(107, 70, 193, 0.3)';
    }
}

// 初始化结果操作按钮
function initResultActions() {
    // 保存结果按钮
    const saveResultBtn = document.getElementById('saveResultBtn');
    if (saveResultBtn) {
        saveResultBtn.addEventListener('click', function() {
            alert('结果已保存到您的个人中心！');
        });
    }
    
    // 打印报告按钮
    const printResultBtn = document.getElementById('printResultBtn');
    if (printResultBtn) {
        printResultBtn.addEventListener('click', function() {
            window.print();
        });
    }
    
    // 分享结果按钮
    const shareResultBtn = document.getElementById('shareResultBtn');
    if (shareResultBtn) {
        shareResultBtn.addEventListener('click', function() {
            // 创建分享链接
            const shareUrl = window.location.href + '?share=true';
            
            // 复制到剪贴板
            navigator.clipboard.writeText(shareUrl).then(() => {
                alert('分享链接已复制到剪贴板！');
            }).catch(err => {
                console.error('无法复制链接: ', err);
                alert('分享链接: ' + shareUrl);
            });
        });
    }
} 
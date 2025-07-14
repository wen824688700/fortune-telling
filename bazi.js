// 八字排盘页面脚本
document.addEventListener('DOMContentLoaded', function() {
    // 初始化高级选项切换
    initAdvancedOptions();
    
    // 初始化表单提交处理
    initFormSubmit();
    
    // 初始化折叠面板
    initCollapsibleSections();
    
    // 初始化五行图表
    initWuxingChart();
    
    // 初始化结果操作按钮
    initResultActions();
});

// 高级选项切换功能
function initAdvancedOptions() {
    const advancedOptionsBtn = document.getElementById('advancedOptionsBtn');
    const advancedOptions = document.querySelector('.advanced-options');
    
    if (!advancedOptionsBtn || !advancedOptions) return;
    
    advancedOptionsBtn.addEventListener('click', function() {
        const isHidden = advancedOptions.style.display === 'none';
        
        // 切换显示状态
        advancedOptions.style.display = isHidden ? 'block' : 'none';
        
        // 更新按钮图标
        const toggleIcon = this.querySelector('.toggle-icon');
        if (toggleIcon) {
            toggleIcon.textContent = isHidden ? '-' : '+';
        }
        
        // 更新按钮文本
        const toggleText = this.querySelector('.toggle-text');
        if (toggleText) {
            toggleText.textContent = isHidden ? '收起高级选项' : '高级选项';
        }
    });
}

// 表单提交处理
function initFormSubmit() {
    const baziForm = document.getElementById('baziForm');
    if (!baziForm) return;
    
    baziForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 显示加载动画
        showLoadingAnimation();
        
        // 获取表单数据
        const formData = new FormData(baziForm);
        const userData = {
            name: formData.get('name'),
            gender: formData.get('gender'),
            birthdate: formData.get('birthdate'),
            birthtime: formData.get('birthtime'),
            birthplace: formData.get('birthplace'),
            uselunar: formData.get('uselunar') === 'on',
            dst: formData.get('dst') === 'on',
            truesun: formData.get('truesun') === 'on',
            startage: formData.get('startage') || 0
        };
        
        // 模拟API调用延迟
        setTimeout(() => {
            // 处理结果
            processResult(userData);
            
            // 隐藏加载动画，显示结果
            hideLoadingAnimation();
            showResult();
        }, 2000);
    });
}

// 显示加载动画
function showLoadingAnimation() {
    const placeholder = document.querySelector('.result-placeholder');
    const loading = document.querySelector('.loading-animation');
    const result = document.querySelector('.result-content');
    
    if (placeholder) placeholder.style.display = 'none';
    if (loading) loading.style.display = 'block';
    if (result) result.style.display = 'none';
}

// 隐藏加载动画
function hideLoadingAnimation() {
    const loading = document.querySelector('.loading-animation');
    if (loading) loading.style.display = 'none';
}

// 显示结果内容
function showResult() {
    const result = document.querySelector('.result-content');
    if (result) result.style.display = 'block';
    
    // 平滑滚动到结果区域
    const resultPanel = document.getElementById('baziResult');
    if (resultPanel) {
        resultPanel.scrollIntoView({ behavior: 'smooth' });
    }
}

// 处理结果数据
function processResult(userData) {
    // 填充基本信息
    document.getElementById('resultName').textContent = userData.name;
    document.getElementById('resultGender').textContent = userData.gender === 'male' ? '男' : '女';
    document.getElementById('resultSolar').textContent = formatDate(userData.birthdate) + ' ' + userData.birthtime;
    
    // 模拟农历转换
    const lunarDate = convertToLunar(userData.birthdate);
    document.getElementById('resultLunar').textContent = lunarDate;
    
    document.getElementById('resultLocation').textContent = userData.birthplace;
    
    // 这里可以添加更多的结果处理逻辑
    // 例如：四柱八字计算、五行分析等
}

// 格式化日期
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日';
}

// 模拟农历转换
function convertToLunar(dateString) {
    // 这里应该是实际的农历转换算法
    // 现在只是简单模拟一个结果
    return '癸卯年四月初八';
}

// 初始化折叠面板
function initCollapsibleSections() {
    const toggleTriggers = document.querySelectorAll('.toggle-trigger');
    
    toggleTriggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const toggleIcon = this.querySelector('.toggle-icon');
            
            const isHidden = content.style.display === 'none';
            
            content.style.display = isHidden ? 'block' : 'none';
            if (toggleIcon) {
                toggleIcon.textContent = isHidden ? '-' : '+';
            }
        });
    });
}

// 初始化五行图表
function initWuxingChart() {
    const chartCanvas = document.getElementById('wuxingChart');
    if (!chartCanvas || typeof Chart === 'undefined') return;
    
    // 五行数据
    const data = {
        labels: ['木', '火', '土', '金', '水'],
        datasets: [{
            data: [65, 30, 45, 25, 70],
            backgroundColor: [
                'rgba(16, 185, 129, 0.7)',  // 木 - 绿色
                'rgba(239, 68, 68, 0.7)',    // 火 - 红色
                'rgba(245, 158, 11, 0.7)',   // 土 - 黄色
                'rgba(156, 163, 175, 0.7)',  // 金 - 灰色
                'rgba(59, 130, 246, 0.7)'    // 水 - 蓝色
            ],
            borderColor: [
                'rgba(16, 185, 129, 1)',
                'rgba(239, 68, 68, 1)',
                'rgba(245, 158, 11, 1)',
                'rgba(156, 163, 175, 1)',
                'rgba(59, 130, 246, 1)'
            ],
            borderWidth: 1
        }]
    };
    
    // 图表配置
    const config = {
        type: 'pie',
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: 'rgba(255, 255, 255, 0.7)'
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.raw + '%';
                        }
                    }
                }
            }
        }
    };
    
    // 创建图表
    new Chart(chartCanvas, config);
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
/**
 * Retrolog 抽屉式目录交互脚本
 */

(function() {
  // 等待 DOM 加载完成
  function initTocDrawer() {
    const tocTab = document.querySelector('.toc-float-tab');
    const tocBackdrop = document.querySelector('.toc-backdrop');
    const tocClose = document.querySelector('.toc-drawer-close');
    const tocLinks = document.querySelectorAll('.toc-drawer-nav a');
    const body = document.body;

    if (!tocTab) {
      console.log('No TOC found on this page');
      return;
    }

    console.log('TOC initialized');

    // 打开/关闭目录
    function toggleToc(e) {
      e.preventDefault();
      e.stopPropagation();
      body.classList.toggle('toc-open');
      console.log('TOC toggled:', body.classList.contains('toc-open'));
    }

    // 关闭目录
    function closeToc(e) {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      body.classList.remove('toc-open');
      console.log('TOC closed');
    }

    // 绑定事件
    tocTab.addEventListener('click', toggleToc);
    console.log('TOC tab click listener added');
    
    if (tocBackdrop) {
      tocBackdrop.addEventListener('click', closeToc);
    }
    
    if (tocClose) {
      tocClose.addEventListener('click', closeToc);
    }

    // 点击目录链接后关闭抽屉
    tocLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        // 延迟关闭以允许平滑滚动
        setTimeout(closeToc, 300);
      });
    });

    // ESC 键关闭
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && body.classList.contains('toc-open')) {
        closeToc();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTocDrawer);
  } else {
    initTocDrawer();
  }
})();

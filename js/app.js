var $ = document.querySelector.bind(document)
var $$ = document.querySelectorAll.bind(document)

document.addEventListener('DOMContentLoaded', ready)

function ready() {
  if (location.hostname === 'blog.egoist.moe') {
    $('.coding-support').classList.add('visible')
  }
  // disqus
  if (window.isPost) {
    disqus()
    makeZoom()
    footnote()
  }
  if (window.hexoLayout === 'page') {
    makeZoom()
  }
  function disqus() {
    var d = document, s = d.createElement('script');
    s.src = "//egoistian.disqus.com/embed.js";
    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);
  }
  function makeZoom() {
    Array.prototype.forEach.call($$('.post-content img'), function (el) {
      zoom(el)
    })
  }
  function footnote() {
    function cleanClass() {
      // Remove all existing class
      Array.prototype.forEach.call($$('.footnote-item'), function (el) {
        el.classList.remove('is-focus')
      })
    }
    Array.prototype.forEach.call($$('.footnote-ref'), function (el) {
      el.querySelector('a').addEventListener('click', function (e) {
        cleanClass()

        var li = $(e.target.getAttribute('href'))
        if (!li.classList.contains('is-focus')) {
          li.classList.add('is-focus')
        }
      })
    })
    Array.prototype.forEach.call($$('.footnote-backref'), function (el) {
      el.addEventListener('click', cleanClass)
    })

    var hash = location.hash
    if (/^#fn\d+$/.test(hash)) {
      $(hash).classList.add('is-focus')
    }
  }
}

(function ($) {
  function buildPages(totalPage, currPage) {
    var items = [];
    var n;

    if (totalPage <= 0) {
      return items;
    }

    items.push(1);

    if (totalPage === 1) {
      return items;
    }

    if (totalPage > 6 && currPage >= 4) {
      items.push("ellipsis-left");
    }

    for (n = 2; n <= totalPage - 1; n += 1) {
      if (
        (currPage <= 3 && n <= 5) ||
        (currPage > totalPage - 3 && n >= totalPage - 4) ||
        Math.abs(currPage - n) <= 1
      ) {
        items.push(n);
      }
    }

    if (totalPage > 6 && totalPage - currPage >= 3) {
      items.push("ellipsis-right");
    }

    items.push(totalPage);

    return items;
  }

  $.fn.ratePagination = function (options) {
    var settings = $.extend(
      {
        list: [],
        countOfPage: 2,
        currPage: 1,
        onPageChange: function () {}
      },
      options
    );

    return this.each(function () {
      var $root = $(this);
      var state = {
        list: settings.list.slice(),
        countOfPage: settings.countOfPage,
        currPage: settings.currPage,
        totalPage: 1,
        pageStart: 0
      };

      function getTotalPage() {
        state.totalPage = Math.max(
          1,
          Math.ceil(state.list.length / state.countOfPage)
        );
      }

      function getPageItems() {
        return state.list.slice(
          state.pageStart,
          state.pageStart + state.countOfPage
        );
      }

      function render() {
        var start = state.list.length === 0 ? 0 : state.pageStart + 1;
        var end = Math.min(
          state.currPage * state.countOfPage,
          state.list.length
        );
        var pages = buildPages(state.totalPage, state.currPage);
        var buttonsHtml = "";

        $.each(pages, function (_, page) {
          if (typeof page === "string" && page.indexOf("ellipsis") === 0) {
            buttonsHtml +=
              '<button class="btn-pointer unactiveNumber" disabled>...</button>';
            return;
          }

          buttonsHtml +=
            '<button class="btn-pointer ' +
            (state.currPage === page ? "activeNumber" : "unactiveNumber") +
            '" data-page="' +
            page +
            '"' +
            (state.currPage === page ? " disabled" : "") +
            ">" +
            page +
            "</button>";
        });

        $root.html(
          '<div class="page-count">顯示第 ' +
            start +
            " 至 " +
            end +
            " 項結果，共 " +
            state.list.length +
            ' 項</div><div class="page-number"><button class="pageCircle" data-role="prev" style="transform: rotate(-180deg)"' +
            (state.currPage === 1 ? " disabled" : "") +
            '></button><div id="pageContainer" style="display: inline-flex; flex-wrap: wrap">' +
            buttonsHtml +
            '</div><button class="pageCircle" data-role="next"' +
            (state.currPage === state.totalPage ? " disabled" : "") +
            "></button></div>"
        );

        settings.onPageChange.call($root[0], {
          currPage: state.currPage,
          totalPage: state.totalPage,
          pageStart: state.pageStart,
          countOfPage: state.countOfPage,
          pageItems: getPageItems(),
          list: state.list.slice()
        });
      }

      function setPage(page) {
        if (page < 1 || page > state.totalPage) {
          return;
        }

        state.currPage = page;
        state.pageStart = (page - 1) * state.countOfPage;
        render();
      }

      $root.off(".ratePagination");

      $root.on("click.ratePagination", "[data-page]", function () {
        setPage(Number($(this).data("page")));
      });

      $root.on("click.ratePagination", '[data-role="prev"]', function () {
        setPage(state.currPage - 1);
      });

      $root.on("click.ratePagination", '[data-role="next"]', function () {
        setPage(state.currPage + 1);
      });

      getTotalPage();
      setPage(state.currPage);
      $root.data("ratePagination", {
        setPage: setPage,
        getState: function () {
          return $.extend({}, state, {
            pageItems: getPageItems()
          });
        }
      });
    });
  };
})(jQuery);

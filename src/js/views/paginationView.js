import View from './View.js';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    console.log(numPages);
    console.log(curPage);

    //page 1 and there are other pages
    if (curPage === 1 && numPages > 1) {
      console.log('page 1 and there are other pages');
      return `
      <button data-goto="${
        curPage + 1
      }" class="btn--inline pagination__btn--next">
        <svg class="search__icon">
          <use href="src/img/icons.svg#icon-arrow-right"></use>
        </svg>
        <span>Page ${curPage + 1}</span>
      </button>
      `;
    }

    //last page
    if (curPage === numPages && numPages > 1) {
      console.log('last page');
      return `
      <button data-goto="${
        curPage - 1
      }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="src/img/icons.svg#icon-arrow-left"></use>
        </svg>
        <span>Page ${curPage - 1}</span>
      </button>
      `;
    }

    //other page
    if (curPage < numPages) {
      console.log('other page');
      return `
      <button data-goto="${
        curPage - 1
      }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="src/img/icons.svg#icon-arrow-left"></use>
        </svg>
        <span>Page ${curPage - 1}</span>
      </button>

      <button data-goto="${
        curPage + 1
      }" class="btn--inline pagination__btn--next">
      <svg class="search__icon">
        <use href="src/img/icons.svg#icon-arrow-right"></use>
      </svg>
      <span>Page ${curPage + 1}</span>
    </button>
      `;
    }
    //page 1 and there are no other pages
    return '';
  }
}

export default new PaginationView();

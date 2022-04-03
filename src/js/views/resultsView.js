import View from './View.js';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');

  _generateMarkup() {
    console.log(this._data);
    return this._data.map(this._generateMarkupPreview).join('');
  }

  _generateMarkupPreview(result) {
    console.log(result);
    return ` 
    <li class="preview">
                    <a class="preview__link" href="#${result.id}">
                      <figure class="preview__fig">
                        <img src="${result.image}" alt="Test" />
                      </figure>
                      <div class="preview__data">
                        <h4 class="preview__name">
                          ${result.title}
                        </h4>
                        <p class="preview__publisher">${result.title}</p>
                      </div>
                    </a>
                  </li>

    `;
  }
}

export default new ResultsView();

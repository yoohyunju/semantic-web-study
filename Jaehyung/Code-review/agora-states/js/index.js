const convertToDiscussion = (obj, index) => {
    const li = document.createElement("li");
    li.className = "discussion__container";
  
    const avatarWrapper = document.createElement("div");
    avatarWrapper.className = "discussion__avatar--wrapper";
    const discussionContent = document.createElement("div");
    discussionContent.className = "discussion__content";
    const discussionAnswered = document.createElement("div");
    discussionAnswered.className = "discussion__answered";
  
    const avatarImg = document.createElement('img');
    avatarImg.classList.add('discussion__avatar--image');
    avatarImg.setAttribute('src' ,`${obj.avatarUrl}`);
    avatarWrapper.append(avatarImg);
  
    addDeleteBtn(li, index);
    
    const discussionTitle = document.createElement('h2');
    discussionTitle.classList.add('discussion__title');
    
    const anchorGit = document.createElement('a');
    anchorGit.setAttribute('href', `${obj.url}`);
    anchorGit.textContent = `${obj.title}`;
    discussionTitle.append(anchorGit);
    discussionContent.append(discussionTitle);
  
    const discussionInfo = document.createElement('div');
    discussionInfo.classList.add('discussion__information');
    discussionInfo.textContent = `${obj.author} / ${timeFormat(obj.createdAt)}`
    discussionAnswered.append(discussionInfo);
  
    const discussionCheck = document.createElement('p');
    discussionCheck.classList.add('discussion__answered');
    discussionCheck.textContent = `☑`;
    discussionAnswered.append(discussionCheck);
  
    li.append(avatarWrapper, discussionContent, discussionAnswered);
    return li;
  };


const render = (data, focus) => {
    const ul = document.querySelector("ul.discussions__container");

    const contentNum = 20;
    const startNum = contentNum * focus;
    const endNum = contentNum * (focus + 1) >= data.length
        ? data.length
        : contentNum * (focus + 1);

    ul.innerHTML = '';
    for (let i = startNum; i < endNum; i += 1) {
        ul.append(convertToDiscussion(data[i], i));
    }
    return;
};

const addPagenationBtn = (data) => {
    const pageNationBox = document.querySelector('.pagenation__box');
    const pageLength = Math.ceil(data.length / 20);
    pageNationBox.innerHTML = '';
    console.log(pageLength)
    for(let i = 1; i <= pageLength; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.classList.add('pagenation__btn');
        pageBtn.textContent = i.toString();
        pageNationBox.append(pageBtn);
    }
};

const addDeleteBtn = (element, index) => {
    const discussionDelete = document.createElement('div');
    const discussionDeleteBtn = document.createElement('button');
    discussionDelete.classList.add('discussion__delete');
    discussionDeleteBtn.classList.add('discussion__delete--btn');
    discussionDeleteBtn.classList.add('hide');
    discussionDeleteBtn.textContent = 'delete';
    discussionDelete.append(discussionDeleteBtn);
    element.append(discussionDelete);
    hoverContentEvent(element, discussionDeleteBtn);
    onClickDeleteBtn(discussionDeleteBtn, index, discussions);
};

const timeFormat = (time) => {
    let newFormat = '';
    const matcher = /[0-2][0-9]:[0-5][0-9]:[0-5][0-9]/g;
    if(time.match(matcher)) {
      const matchTime = time.match(matcher)[0].split(':');
      matchTime[0] >= 12 ? newFormat += '오후' : newFormat += '오전';
      matchTime[0] > 12 ? newFormat += ` ${matchTime[0] - 12}:` : newFormat += ` ${matchTime[0]}:`;
      newFormat += `${matchTime[1]}:${matchTime[2]}`;
    }else {
      newFormat = time;
    }
    return newFormat;
  };



const discussions = getLocalData();
mount(discussions);
render(discussions, 0);
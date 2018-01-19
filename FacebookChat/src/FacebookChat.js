class FacebookChat {
    constructor(container) {
        this.root = document.createElement("div");
        this.root.innerHTML = this.initRender();
        this.root.classList.add("chat-box");
        container.appendChild(this.root);

        this.root
            .querySelector(".form")
            .addEventListener("submit", this.addMessage.bind(this))
    }

    initRender() {
        return `
        <header class="header">
            <div class="header__presence"></div>
            <a href="" class="header__name">Kristaps Elsins</a>
            <a href=""><img src="images/Close.svg" alt="" class="chat-option chat-option_close"></a>
            <a href=""><img src="images/Cog.svg" alt="" class="chat-option chat-option_cog"></a>
            <a href=""><img src="images/Video.svg" alt="" class="chat-option chat-option_video"></a>
            <a href=""><img src="images/Plus.svg" alt="" class="chat-option chat-option_plus"></a>
        </header>
        <section class="chat">
            <div class="friend-message">
                <img src="images/userphoto1.jpg" alt="" class="friend-message__user-image">
                <p class="friend-message__text friend-message__text_normal">
                    Yo, Can you update views?
                </p>
            </div>
            <time class="chat__date">FRI 11:30AM</time>
            <div class="friend-message">
                <img src="images/userphoto1.jpg" alt="" class="friend-message__user-image">
                <p class="friend-message__text friend-message__text_normal">
                    I can’t see updated views yet
                </p>
            </div>
            <div class="my-message">
                <p class="my-message__text my-message__text_upper">
                    Hi, as I noted in Email last week - I am on vacation.
                </p>
                <p class="my-message__text my-message__text_down">
                    I will be back next week
                </p>
            </div>
            <div class="friend-message friend-message_clear-fix">
                <img src="images/userphoto1.jpg" alt="" class="friend-message__user-image">
                <p class="friend-message__text friend-message__text_upper">
                    Ahh sorry, missed that!
                </p>
                <p class="friend-message__text friend-message__text_down">
                    Let’s talk next week
                </p>
            </div>
        </section>
        <section class="message-creator">
            <div class="message-creator__line"></div>
            <form action="" class="form">
                <input type="text" class="message-creator__input" name="message" placeholder="Type a message...">
            </form>
            <div class="message-options">
                <a href=""><img src="images/Picture.svg" alt="" class="message-options__image"></a>
                <a href=""><img src="images/Gif.svg" alt="" class="message-options__image"></a>
                <a href=""><img src="images/Smile.svg" alt="" class="message-options__image"></a>
                <a href=""><img src="images/Calendar.svg" alt="" class="message-options__image"></a>
                <a href=""><img src="images/Camera.svg" alt="" class="message-options__image"></a>
            </div>
        </section>
        `
    }

    addMessage(ev) {
        ev.preventDefault();

        let form = ev.target;
        let text = form["message"].value;
        let chat = this.root.querySelector(".chat");

        if (text !== "") {
            chat.innerHTML += `
                <div class="my-message friend-message_clear-fix">
                    <p class="my-message__text my-message__text_middle">
                        ${text}
                    </p>
                </div>
                `;
            form["message"].value = "";
        }

        chat.scrollTop = chat.scrollHeight - chat.clientHeight;
    }
}

export default FacebookChat;

export const toggleMedias = (block, toggleOpen, toggleClose) => {
    if (block.style.display === "flex") {
        block.style.display = "none";
        toggleOpen.style.display = "none";
        toggleClose.style.display = "flex";

    } else {
        block.style.display = "flex";
        toggleOpen.style.display = "flex";
        toggleClose.style.display = "none";
    }
}
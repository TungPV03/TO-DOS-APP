import { useRef } from "react"

export const useScrollable = (loadMoreItem) =>{
    const scrollContainer = useRef();
    const delta = 20;

    const setRef = (ref) =>{
        scrollContainer.current = ref;
    }

    const handleScroll = () => {
        if(scrollContainer.current.scrollTop + scrollContainer.current.clientHeight 
            >= scrollContainer.current.scrollHeight - delta)
        {
            loadMoreItem();
        }
    }

    return {setRef, handleScroll};
}
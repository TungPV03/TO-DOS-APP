import { PureComponent} from "react";
import React from "react";

export default function ehanceScrollComponent(WrappedComponent){
    return class ScrollableComponent extends PureComponent{
        constructor(props){
            super(props);
            this.wrappedComponentRef = React.createRef();
            this.scrollContainer = React.createRef();
        }

        setRef = (ref) => {
            this.scrollContainer.current = ref;
        }

        handleScroll = () => {
            if(this.scrollContainer.current.scrollTop + this.scrollContainer.current.clientHeight 
                >= this.scrollContainer.current.scrollHeight - 20)
            {
                this.wrappedComponentRef.current.loadMoreItem();
            }
        }

        render(){
            return(
                <WrappedComponent 
                    setRef={this.setRef}
                    handleScroll = {this.handleScroll}
                    {...this.props}
                    ref={this.wrappedComponentRef}/>
            )
        }
    }
}
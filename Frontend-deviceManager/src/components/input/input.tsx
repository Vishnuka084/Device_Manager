import React from "react";

interface Props {
    type:string;
    name:string;
    placeholder?:string;
    label:string;
    optional:boolean
    value?:string;
    callBack: Function;
}

class Input extends React.Component<Props, any>{
    render() {
        return(
            <div className={'mb-0 w-full mx-1'}>
                <label htmlFor={this.props.name} className={'block text-black text-[15px] font-[500] mb-0.5'}></label>
            </div>
        )
    }
}


export default Input;
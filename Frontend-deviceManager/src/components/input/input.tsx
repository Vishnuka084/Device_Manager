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
                <label htmlFor={this.props.name} className={'block text-black text-[15px] font-[500] mb-0.5'}>
                    {this.props.label}{!this.props.optional ? <span className={'text-red-600'}> *</span> : null }</label>
                <input
                    placeholder={this.props.placeholder}
                    type={this.props.type}
                    id={this.props.name}
                    value={this.props.value}
                    onChange={event => this.props.callBack(event, this.props.name)}
                    className={'w-full h-[40px] font-Poppins rounded-[5px] px-3 block border-2 border-gray-400 outline-none focus:border-black'}/>

            </div>
        )
    }
}


export default Input;
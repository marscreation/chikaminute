/**
 *@param header String title of the page 
 *@param footerContent String An to be placed on footer area 
 **/ 
function MobileSubPage(props) {
    return (
        <div className="absolute top-0 left-0 inset-0 h-screen flex-col flex justify-center">
            <div>
                <div className="header relative h-16">
                    <button className='back px-4 h-full absolute left-0'>BACK</button>
                    <div className="grid h-full place-content-center font-bold text-2xl">
                        <p>{props.header}</p>
                    </div>
                </div>
            </div>
            <div className="body overflow-y-auto h-screen py-2">
                {props.children}
            </div>
            {props.footerContent && (<div className='h-16'>{props.footerContent}</div>)}
        </div>
    )
}

export default MobileSubPage
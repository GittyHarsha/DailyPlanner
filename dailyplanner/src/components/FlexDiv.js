export default function FlexDiv({style,children,...props}) {

    return (
        <div
        {...props}
        style={{
            margin: '0',
            paddingLeft: '0px',
            //border: '1px solid black',
            display:'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems:'center',
            zIndex: 1,
            ...(style?style: null)
        }}
        >
            {children}
        </div>
    )
};


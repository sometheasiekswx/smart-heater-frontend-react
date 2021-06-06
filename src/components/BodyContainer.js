function BodyContainer(props) {
    const {children} = props;
    return (
        <div className="py-5">
            <main className="h-full overflow-y-auto">
                <div className="container  mx-auto grid">
                    {children}
                </div>
            </main>
        </div>
    )
}

export default BodyContainer;
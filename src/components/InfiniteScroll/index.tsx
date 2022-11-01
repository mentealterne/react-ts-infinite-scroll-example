import React, {CSSProperties, useEffect, useRef} from "react";
import ClipLoader from "react-spinners/ClipLoader";

interface IProps {
    children: React.ReactNode;
    onFetchMore: () => void;
    totalItems: number;
    actualItemsLength: number;
    isLoading: boolean;
}

const InfiniteScroll: React.FC<IProps> = (props) => {
    const override: CSSProperties = {
        display: "block",
        margin: "0 auto",
        borderColor: "orange",
        padding: "10px",
    };


    const handleObserver = (entries: IntersectionObserverEntry[]) => {
        const target = entries[0];
        if (target.isIntersecting) {
            if (props.actualItemsLength < props.totalItems) props.onFetchMore();
        }
    }
    const loader = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const option: IntersectionObserverInit = {
            threshold: 0.8,
            rootMargin: '0px'
        };
        const observer = new IntersectionObserver(handleObserver, option);
        if (loader?.current) {
            observer.observe(loader?.current as Element)
        }

        return () => {
            observer.disconnect()
        }
    }, [handleObserver]);
    return (
        <div className={'flex flex-col justify-between w-full gap-4  overflow-visible mb-4'} id={'infinite-scroll'}>
            {props.children}

            <ClipLoader
                color={'#000000'}
                loading={props.isLoading}
                size={50}
                cssOverride={override}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
            {!props.isLoading && (props.actualItemsLength < props.totalItems ?
                <div className={'h-24'} ref={loader}/> : 'No more results')}
        </div>
    );
}

export default InfiniteScroll;

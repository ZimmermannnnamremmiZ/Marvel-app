import { Helmet } from "react-helmet";

import AppBanner  from '../appBanner/AppBanner';
import ComicsList from '../comicsList/ComicsList';

const ComicsPage = () => {
    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Сomics listing page"
                />
                <title>Marvel comics page</title>
            </Helmet>
            <AppBanner />
            <ComicsList />
        </>
    )
}

export default ComicsPage;
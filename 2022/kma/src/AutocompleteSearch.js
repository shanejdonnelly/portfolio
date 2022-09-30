import { Grid, GridItem } from '@chakra-ui/react';
import { navigate } from "@reach/router";
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

const Search = ({ jobs }) => {
    const filteredJobsForSearch = jobs.map((job, index) => {
        return {
            id: job.id,
            name: `${job.text} - ${job.categories.department} - ${job.categories.location}`
        }
    })

    const handleOnSelect = (item) => {
        navigate(`/job/${item.id}`)
    }

    return (
        <Grid templateColumns={{ base: 'repeat(6, 1fr)' }} gap={3} marginBottom={8} alignItems={'center'}>
            <GridItem colStart={{ base: 1, md: 2 }} colSpan={{ base: 6, md: 4 }}>
                <ReactSearchAutocomplete
                    fuseOptions={{ minMatchCharLength: 2 }}
                    items={filteredJobsForSearch}
                    placeholder='Search jobs'
                    onSelect={handleOnSelect}
                    styling={{
                        border: '1px solid #1a202c',
                        borderRadius: '6px',
                        height: '40px',
                        zIndex: 10

                    }}
                />
            </GridItem>
        </Grid>
    )
}

export default Search;
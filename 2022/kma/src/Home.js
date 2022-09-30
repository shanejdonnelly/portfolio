import { useState, useEffect } from 'react';
import { withQueryParams, withDefault, StringParam } from 'use-query-params';
import { Box, Button, Grid, GridItem, Heading, Input, InputGroup, InputRightElement, InputLeftElement, Text, VStack } from '@chakra-ui/react';
import { ArrowBackIcon, SearchIcon, CloseIcon } from '@chakra-ui/icons'
import Fuse from 'fuse.js';
import FilterBar from "./FilterBar";
import JobBoardCard from "./JobBoardCard";
import Sort from "./Sort";

const Home = ({ query, setQuery }) => {
    const [allJobs, setAllJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [sort, setSort] = useState('jobTitle');
    const [search, setSearch] = useState(query.search || '');
    const [employers, setEmployers] = useState([]);

    const onFilterChange = (value, type) => {
        //re-filter jobs, start with all jobs again
        let onChangeFilteredJobs = allJobs;

        if (type === 'department') {
            //filter if not changing back to All
            onChangeFilteredJobs = value ? onChangeFilteredJobs : onChangeFilteredJobs.filter(job => job.categories.department === value);
            setQuery({ department: value })
        }
        else {
            onChangeFilteredJobs = !query.department ? onChangeFilteredJobs : onChangeFilteredJobs.filter(job => job.categories.department === query.department);
        }
        if (type === 'location') {
            //filter if not changing back to All
            onChangeFilteredJobs = value ? onChangeFilteredJobs : onChangeFilteredJobs.filter(job => job.categories.location === value);
            setQuery({ locale: value })
        }
        else {
            onChangeFilteredJobs = !query.locale ? onChangeFilteredJobs : onChangeFilteredJobs.filter(job => job.categories.location === query.locale);
        }
        if (type === 'team') {
            //filter if not changing back to All
            onChangeFilteredJobs = value ? onChangeFilteredJobs : onChangeFilteredJobs.filter(job => job.categories.team === value);
            setQuery({ team: value })
        }
        else {
            onChangeFilteredJobs = !query.team ? onChangeFilteredJobs : onChangeFilteredJobs.filter(job => job.categories.team === query.team);
        }

        setFilteredJobs(onChangeFilteredJobs)
    }

    useEffect(() => {
        //when app is loaded in WP, this is necessary
        window.scrollTo(0, 0);

        const data = JSON.parse(localStorage.getItem("jobsData"));
        setAllJobs(data);
        filterData(data);

        //doing this here to get the total number of employers
        const mappedName = data.map(d => d.categories.department)
        const occurrences = mappedName.reduce(function (acc, curr) {
            return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc
        }, {});
        const uniqueNames = [...new Set(mappedName)]
        const mapped = uniqueNames.map(d => {
            return {
                cleanName: d.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-'),
                originalName: d,
                numJobs: occurrences[d]
            }
        })
        setEmployers(mapped)

    }, [query])

    const filterData = (data) => {
        let initialFilteredJobs = data;
        if (query.department) {
            initialFilteredJobs = initialFilteredJobs.filter(job => job.categories.department === query.department)
        }
        if (query.locale) {
            initialFilteredJobs = initialFilteredJobs.filter(job => job.categories.location === query.locale)
        }
        if (query.team) {
            initialFilteredJobs = initialFilteredJobs.filter(job => job.categories.team === query.team)
        }
        if (query.search) {

            const data = JSON.parse(localStorage.getItem("jobsData"));
            const fuse = new Fuse(data, {
                keys: [
                    { name: 'categories.location', weight: 0.3 },
                    { name: 'categories.department', weight: 0.3 },
                    { name: 'descriptionPlain', weight: 0.3 },
                    { name: 'text', weight: 0.7 },
                ],
                includeScore: true
            });

            const searchResults = fuse.search(query.search)
            initialFilteredJobs = searchResults.map(r => r.item)
        }

        setFilteredJobs(initialFilteredJobs)
    }

    const handleClearAll = () => {
        setSearch('')
        setFilteredJobs(allJobs);
        setQuery({
            department: undefined,
            team: undefined,
            locale: undefined,
            search: undefined
        });
        const url = new URL(window.location);
        url.searchParams.delete('search');
        url.searchParams.delete('department');
        url.searchParams.delete('locale');
        url.searchParams.delete('team');
        window.history.pushState({}, '', url);
    }

    const handleSearchChange = (e) => {
        setSearch(e.target.value)
        if (!!e.target.value) {
            setQuery({ search: e.target.value })
        }
        else {
            setQuery({ search: undefined })
        }
    }

    return (
        <Box paddingBottom={12}>

            {!!search.length && (
                <Button fontSize={'sm'} onClick={handleClearAll} variant="link" leftIcon={<ArrowBackIcon w={5} h={5} />} marginBottom={6} >
                    Back to All Jobs
                </Button>
            )}

            <Grid templateColumns={{ base: 'repeat(5, 1fr)' }} gap={3} marginBottom={4} alignItems={'center'}>
                <GridItem colSpan={5}>
                    <Text textAlign={'center'} color={'blue.900'} fontWeight={400} fontSize={'16px'}>
                        Search
                        <Text display={'inline'} fontWeight={600}> {allJobs.length} </Text>
                        jobs from
                        <Text display={'inline'} fontWeight={600}> {employers.length} </Text>
                        companies
                    </Text>
                </GridItem>
                <GridItem colStart={{ base: 1, md: 2 }} colSpan={{ base: 5, md: 3 }}>
                    <InputGroup>
                        <InputLeftElement
                            pointerEvents='none'
                            children={<SearchIcon color='gray.300' />}
                        />
                        {!!search.length && (
                            <InputRightElement>
                                <CloseIcon onClick={handleClearAll} color='gray.300' />
                            </InputRightElement>
                        )}
                        <Input placeholder="Search jobs" onChange={handleSearchChange} value={search} fontSize={'14px'} />
                    </InputGroup>

                </GridItem>

                {!search.length && (
                    <GridItem colSpan={5}>
                        <Text textAlign={'center'} color={'blue.900'} fontWeight={400} fontSize={'16px'}>or filter jobs below</Text>
                    </GridItem>
                )}
            </Grid>

            {!search.length && (
                <FilterBar
                    onChange={onFilterChange}
                    jobs={filteredJobs}
                    query={query}
                    setQuery={setQuery}
                    clearAllFilters={handleClearAll}
                />

            )}

            {!!search.length && (
                <Heading as='h2' size={'lg'}>
                    Search Results
                    <Text display={'inline'} marginLeft={2} fontSize={'sm'}>({filteredJobs.length} results)</Text>
                </Heading>
            )}


            {!search.length && (
                <Sort jobs={filteredJobs} setJobs={setFilteredJobs} sort={sort} setSort={setSort} />
            )}


            <VStack spacing={4}>
                {filteredJobs.length ? filteredJobs.map((job, index) =>
                    <JobBoardCard data={job} key={`job_${index}`} />
                )
                    :
                    (<VStack spacing={2}>
                        <Heading as="h2" size={'md'}>No job matches.</Heading>
                        <Text cursor={'pointer'} onClick={handleClearAll}>Go back to all job postings.</Text>
                    </VStack>
                    )}
            </VStack>
        </Box>

    )
}

export default withQueryParams({
    department: withDefault(StringParam, undefined),
    locale: withDefault(StringParam, undefined),
    team: withDefault(StringParam, undefined),
    search: withDefault(StringParam, undefined),
}, Home);
import { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";
import { Box, Heading, Link, Text, VStack } from '@chakra-ui/react';
import { withQueryParams, withDefault, StringParam } from 'use-query-params';
import { startCase } from 'lodash'
import { Link as ReachLink, navigate } from '@reach/router'
import FilterBar from "./FilterBar";
import JobBoardCard from "./JobBoardCard";
import Sort from "./Sort";

const Employer = ({ employerName, query, setQuery }) => {
    const [allJobs, setAllJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [sort, setSort] = useState('jobTitle');

    const onFilterChange = (value, type) => {
        //re-filter jobs, start with all jobs again
        let onChangeFilteredJobs = allJobs;

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

        //map client names to clean routes
        const alteredData = data.map(d => {
            return {
                ...d,
                categories: {
                    ...d.categories,
                    cleanName: d.categories.department.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-'),
                }
            }
        })

        //filter to department
        const dataFilteredToDepartment = alteredData.filter(job => job.categories.cleanName === employerName)

        if (dataFilteredToDepartment && dataFilteredToDepartment.length) {
            setAllJobs(dataFilteredToDepartment);

            let initialFilteredJobs = dataFilteredToDepartment;
            if (query.locale) {
                initialFilteredJobs = initialFilteredJobs.filter(job => job.categories.location === query.locale)
            }
            if (query.team) {
                initialFilteredJobs = initialFilteredJobs.filter(job => job.categories.team === query.team)
            }
            setFilteredJobs(initialFilteredJobs)

        }
        else {
            navigate(`/jobs/notfound`)
        }

    }, [query])

    const handleClearAll = () => {
        setFilteredJobs(allJobs);
        setQuery({
            locale: undefined,
            team: undefined
        })
        const url = new URL(window.location);

        url.searchParams.delete('locale');
        url.searchParams.delete('team');
        window.history.pushState({}, '', url);
    }

    return (
        <>
            <Helmet>
                <title>{`${startCase(employerName)}`}</title>
            </Helmet>

            <Heading as="h2" size="xl" marginBottom={6}>{startCase(employerName)}</Heading>

            <FilterBar
                onChange={onFilterChange}
                jobs={filteredJobs}
                query={query}
                showDepartment={false}
                clearAllFilters={handleClearAll}
                setQuery={setQuery}
            />

            <Sort jobs={filteredJobs} setJobs={setFilteredJobs} sort={sort} setSort={setSort} />

            <VStack spacing={4}>
                {filteredJobs.length ? filteredJobs.map((job, index) =>
                    <JobBoardCard data={job} key={`job_${index}`} />
                )
                    :
                    (<VStack spacing={2}>
                        <Heading as="h2" size={'lg'}>No jobs match these filters.</Heading>
                        <Text cursor={'pointer'} onClick={handleClearAll}>Go back to all job postings.</Text>
                    </VStack>
                    )}
            </VStack>
            <Box marginTop={8} marginBottom={8}>
                <Link as={ReachLink} to="/jobs">See All Jobs</Link>
            </Box>
        </>
    )
}

export default withQueryParams({
    locale: withDefault(StringParam, undefined),
    team: withDefault(StringParam, undefined)
}, Employer);
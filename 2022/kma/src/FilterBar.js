import {
    Grid,
    GridItem,
    Select,
    Tag,
    TagLabel,
    TagCloseButton,
    Text
} from '@chakra-ui/react';

const FilterBar = ({ onChange, jobs, query, setQuery, clearAllFilters, showDepartment = true }) => {
    let numQueries = 0;
    Object.keys(query).forEach((key) => {
        if (query[key]) {
            numQueries++;
        }
    }, {})

    function makeOptions(type) {

        jobs.forEach(job => {
            if (!job.categories[type]) {
                //this catches undefined 
                job.categories[type] = 'Other'
            }
        })

        //get the number of jobs that match the type (location, department, etc)
        const num = jobs.reduce(function (acc, curr) {
            return acc[curr.categories[type]] ? ++acc[curr.categories[type]] : acc[curr.categories[type]] = 1, acc
        }, {});

        //new Set will remove dups, but need values to be an array for sorting, etc
        const values = [...new Set(jobs.map(job => job.categories[type]))].sort();
        const labels = values.map(val => `${val} (${num[val]})`);
        const options = values.map((v, index) => {
            return {
                value: v,
                label: labels[index]
            }
        })

        return [...options];
    }

    const locationOptions = makeOptions('location')
    const departmentOptions = makeOptions('department')
    const teamOptions = makeOptions('team')

    return (

        <Grid templateColumns={showDepartment ? { base: 'repeat(1, 1fr)', md: 'repeat(5, 1fr)' } : { base: 'repeat(1, 1fr)', md: 'repeat(4, 1fr)' }} gap={3} marginBottom={8} alignItems={'center'}>

            <GridItem>
                <Text color={'gray.800'} fontSize={'xs'} fontWeight={400} textAlign={{ base: 'left', md: 'right' }}>Filter by:</Text>
            </GridItem>

            {showDepartment && (
                <GridItem>
                    {!query.department ? (
                        <Select fontSize={'14px'} options={departmentOptions} placeholder="Company" value={query.department} onChange={(e) => onChange(e.target.value, 'department')}>
                            {departmentOptions.map((option, index) => <option key={`departmentOption_${index}`} value={option.value}>{option.label}</option>)}
                        </Select>
                    ) : (
                        <Tag fontSize={'14px'} size={'xl'} variant={'solid'} justifyContent="space-between" width={'100%'}>
                            <TagLabel>{query.department}</TagLabel>
                            <TagCloseButton onClick={() => { setQuery({ department: undefined }) }} />
                        </Tag>
                    )}
                </GridItem>
            )}

            <GridItem>
                {!query.locale ? (
                    <Select fontSize={'14px'} placeholder="Location" options={locationOptions} value={query.locale} onChange={(e) => onChange(e.target.value, 'location')}>
                        {locationOptions.map((option, index) => <option key={`localeOption_${index}`} value={option.value}>{option.label}</option>)}
                    </Select>
                ) : (
                    <Tag fontSize={'14px'} size={'xl'} variant={'solid'} justifyContent="space-between" width={'100%'}>
                        <TagLabel>{query.locale}</TagLabel>
                        <TagCloseButton onClick={() => { setQuery({ locale: undefined }) }} />
                    </Tag>
                )}
            </GridItem>

            <GridItem>
                {!query.team ? (
                    <Select fontSize={'14px'} placeholder="Category" options={teamOptions} value={query.team} onChange={(e) => onChange(e.target.value, 'team')}>
                        {teamOptions.map((option, index) => <option key={`localeOption_${index}`} value={option.value}>{option.label}</option>)}
                    </Select>

                ) : (
                    <Tag fontSize={'14px'} size={'xl'} variant={'solid'} justifyContent="space-between" width={'100%'}>
                        <TagLabel>{query.team}</TagLabel>
                        <TagCloseButton onClick={() => { setQuery({ team: undefined }) }} />
                    </Tag>
                )}
            </GridItem>

            <GridItem>
                {numQueries > 1 && (
                    <span style={{ cursor: 'pointer' }} onClick={() => { clearAllFilters(); }}>Clear All Filters</span>
                )}
            </GridItem>
        </Grid>
    )
}

export default FilterBar;
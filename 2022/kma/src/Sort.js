import { HStack, Select, Text } from '@chakra-ui/react';

const Sort = ({ jobs, setJobs, sort, setSort }) => {

    const handleSortChange = (e) => {
        const sortOrder = e.target.value;
        if (sortOrder === 'datePosted') {
            setSort('datePosted')
            setJobs(jobs.sort((a, b) => b.createdAt - a.createdAt))
        }
        else if (sortOrder === 'jobTitleAsc') {
            setSort('jobTitleAsc')
            setJobs(jobs.sort((a, b) => a.text.toLowerCase().localeCompare(b.text.toLowerCase())))
        }
        else if (sortOrder === 'jobTitleDesc') {
            setSort('jobTitleDesc')
            setJobs(jobs.sort((a, b) => b.text.toLowerCase().localeCompare(a.text.toLowerCase())))
        }
    }

    return (
        <HStack marginBottom={3} marginTop={2} maxW={'200px'}>
            <Text color={'gray.800'} fontSize={'xs'} fontWeight={400} width={'75px'}>Sort by:</Text>
            <Select size={'sm'} fontSize={'14px'} onChange={handleSortChange} value={sort}>
                <option value="jobTitleAsc">Job Title (A-Z)</option>
                <option value="jobTitleDesc">Job Title (Z-A)</option>
                <option value="datePosted">Date Posted</option>
            </Select>
        </HStack>
    )
}

export default Sort;
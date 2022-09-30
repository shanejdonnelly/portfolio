import { useEffect, useState } from 'react';
import { navigate } from '@reach/router'
import { Link as ReachLink } from '@reach/router'
import { Box, Link } from '@chakra-ui/react';

const Clients = () => {
    const [clients, setClients] = useState([])

    useEffect(() => {
        //when app is loaded in WP, this is necessary
        window.scrollTo(0, 0);

        const data = JSON.parse(localStorage.getItem("jobsData"));
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
        setClients(mapped)
    }, [])



    return (
        <>
            <Box marginBottom={8}>
                {clients.map((client, index) => (
                    <Box key={`${index}_${client.cleanName}`}>
                        <Link onClick={() => navigate(`/jobs/e/${client.cleanName}`)}>{client.originalName} ({client.numJobs})</Link>
                    </Box>
                )
                )}
            </Box>
            <Box marginBottom={8}>
                <Link as={ReachLink} to="/jobs">See All Jobs</Link>
            </Box >
        </>
    )
}

export default Clients;
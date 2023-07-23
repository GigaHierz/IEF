##  Legal

<table>
    <th>Schema</th>
    <th>Name</th>
    <th>Description</th>
    <tbody>
        <tr>
            <td>
                46
            </td>
            <td>
               Communication issued to lobby members
            </td>
            <td>    
             Verify the information on the communication issued to lobby members to 
            </td>
        </tr>
        <tr>
            <td>
               110
                </a>
            </td>
            <td>
                Attest to knowledge sharing
            </td>
            <td>    
                Lobby groups can list all the members they've shared intel with for their benefit in a privacy preserving way. Through Sismo, outsiders can verify the number of beneficiaries of these data, without being able to see their specific names and if required the lobby group can generate individual proofs per recepient for others to validate their inclusion in this set. 
            </td>
        </tr>
        <tr>
            <td>
                110
            </td>
            <td>
Meeting attendance             </td>
            <td>    
              Registration of lobbying meetings by lobby groups which can include the name of the person met, topic discussed, etc. The information is private and not visible to the general public and may only be verified through the proof issued, per field, by the attester.  
            </td>
              <tr>
            <td>
               46
                </a>
            </td>
            <td>
                Position Paper
            </td>
            <td>    
                Hashing of the position paper issued by the lobbying group in face of an upcoming regulation. 
            </td>
        </tr>
 <tr>
            <td>
                <a>
               16
                </a>
            </td>
            <td>
Initial draft            </td>
            <td>    
                Hashing of the initial draft of an article received for rewriting. 
            </td>
 </tr>
     <tr>
    <td>
            <a>
               16
                </a>
            </td>
            <td>
Rewriten article            </td>
            <td>    
                Hashing of the second draft issued by the government body once the position paper has been shared and lobbying is underway. Through this second attestation lobby groups can describe how much of the information they shared with regulators through their position papers and communication strategy has been used to improve the initial draft. 
            </td>
        </tr>

    

</table>


##  Education

<table>
    <th>Schema</th>
    <th>Name</th>
    <th>Description</th>
    <tbody>
        <tr>
            <td>
            110
            </td>
            <td>
               Organization Scholarship or Fellowship recipient 
            </td>
            <td>    
             Signal the number of beneficiaries from scholarships or fellowships from your organizations programs withouth endangering their personal data. Only if desired and approved would you be able to share their name or other data. 
            </td>
        </tr>
        <tr>
            <td>
               8
                </a>
            </td>
            <td>
                Has participated in hackathon
            </td>
            <td>    
                This attestation would be referring a previous attestation if the recepient is also a fellow or scholar during the time of the hackathon. 
            </td>
        </tr>
        <tr>
            <td>
                27
            </td>
            <td>
Hackathon submission             </td>
            <td>    
              Attestation to the submission of projects by hackathon participants. This attestation can reference a "has participated in hackathon" attestation which will enable the traceability of the original action.   
            </td>
              <tr>
            <td>
               39
                </a>
            </td>
            <td>
Employement verification
            </td>
            <td>    
                Attest to the employement of an individual. If this person was previously a fellow or scholar, and that action contributed to their employement this attestation can reference to them. 
            </td>
        </tr>

</table>


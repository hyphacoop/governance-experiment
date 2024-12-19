# Governance experiment
![image](https://github.com/hyphacoop/governance-experiment/assets/631268/468b3e0b-ab1a-4a61-a631-01bd008d930d)

This repository hosts Hypha's collaborative governance experiment, a project exploring decentralized decision-making, participatory processes, and visual storytelling. The experiment combines historical insights, interactive tools, and decentralized voting mechanisms to foster better governance and collective lore creation.

The project comprises two main components:
- [**Dashboard**](./dashboard): A frontend interface for collaborative decision-making, visualizing proposals, and vote results.
- [**Timeline**](./timeline): A visual representation of key moments in Hypha's history, co-created through participatory processes.

You can see these two components currently hosted on GitHub Pages:  
- **Dashboard**: [https://hyphacoop.github.io/governance-experiment/](https://hyphacoop.github.io/governance-experiment/)  
- **Timeline**: [https://hyphacoop.github.io/governance-experiment/timeline](https://hyphacoop.github.io/governance-experiment/timeline)

---

## Table of Contents

- [Project Description](#project-description)
- [Process](#process)
- [Voting Platforms](#voting-platforms)
- [Tools Used](#tools-used)
- [Links to Key Repositories](#links-to-key-repositories)
- [Conclusion](#conclusion)

---

## Project Description

This governance experiment aims to:
1. **Document and Visualize History:** Create a co-op timeline by identifying and voting on key events.
2. **Test Governance Tools:** Explore decentralized and participatory decision-making processes using various platforms.
3. **Build Co-op Lore:** Enhance the cooperative’s narrative by collaboratively curating and celebrating its milestones.

Through the experiment, we:
- Collect and analyze historical data from meeting notes, proposals, and decisions.
- Use multiple voting platforms to deliberate and decide what becomes part of the timeline.
- Leverage decentralized technologies, such as Earthstar, for secure, anonymous voting.

---

## Process

1. **Data Collection:** Extract insights from meeting notes and cooperative history.
2. **Voting and Deliberation:** Use a combination of voting tools, including ADoodle, Onvote.app, and **Constellate**, our custom-built Earthstar-based [voting tool](https://github.com/tripledoublev/voting-interface), to gather participants' approval.
3. **Visualization:** Represent selected events visually through the [timeline](./timeline).
4. **Feedback and Iteration:** Gather member feedback to refine the tools and processes.
5. **Lore Creation:** Publish a finalized timeline and decisions as part of Hypha’s lore.

---

## Voting Platforms

### Ready-to-Use Voting Tools
We used ADoodle and Onvote.app to test different voting platforms.

### Constellate: Our Custom-Built Earthstar-Based Voting Tool
For sensitive or anonymous votes, we developed [Constellate](https://github.com/tripledoublev/voting-interface), a Svelte app powered by Earthstar.  
**Constellate** allows you to quickly and easily create anonymous voting events. It supports restricted voting with pre-defined keypairs or open voting for informal feedback. This web app ensures confidentiality while enabling accurate and secure vote tallying.


### GitHub Project Boards
We used GitHub issues and project boards for tracking decisions, proposals, and feedback during the experiment.

---

## Tools Used

- **[Dashboard](./dashboard):** Visualizes decision logs, vote results, and other governance data.
- **[Timeline](./timeline):** Showcases selected co-op milestones.
- **Constellate:** A custom-built Svelte app that uses Earthstar for anonymous voting events.
- **Earthstar:** A decentralized storage protocol used for storing votes.
- **Matrix:** Our chat space for discussions.
- **Google Sheets:** Provides an accessible interface for decision logs.
- **GitHub:** Facilitates issue tracking and repository management.

---

## Links to Key Repositories

- **Dashboard:** [Governance Dashboard](./dashboard)
- **Timeline:** [Timeline Visualization](./timeline)
- **Constellate:** [Earthstar-Based Voting Tool](https://github.com/tripledoublev/voting-interface)


---

## Conclusion

The Governance Experiment combines decentralized tools, collaborative storytelling, and participatory decision-making to document Hypha’s history and refine its governance processes. By testing various methods and tools, we aim to create a replicable framework for horizontal governance and explore new ways of working together.

Stay tuned for future updates. See the current version of the [timeline on GitHub Pages](https://hyphacoop.github.io/governance-experiment/timeline). We aim to refine these tools and processes further, with plans to explore scaling this experiment to other teams or organizations.

---
title: "Automating My Linux Setup with Ansible"
date: 2025-03-13T20:08:17-03:00
draft: false
---

# Automating My Linux Setup with Ansible

As a developer, I often find myself working on multiple machines and environments. Maintaining a consistent configuration across all of them can be challenging. Whenever I accessed a new machine via SSH, my development environment wasn't configured to my liking. To solve this problem, I decided to automate the configuration of my Ubuntu environment using Ansible.

## What is Ansible?

Ansible is an open-source automation tool that enables configuration management, application deployment, and task orchestration. One of its main advantages is that it's *agentless*, meaning it doesn't require additional software installation on the machines it manages, as it communicates through SSH.

## Organizing My Dotfiles

The first step was to organize my [*dotfiles*](https://github.com/aenrione/dotFiles), which are configuration files for various applications and development tools. By centralizing these files in a repository, it's possible to maintain version control and ensure that configurations are consistent across all my machines.

## Creating Ansible Playbooks

From there, I proceeded to create Ansible playbooks. A playbook is a YAML file that defines a series of tasks that Ansible will execute on target machines. These tasks can include installing packages, copying configuration files, and executing commands.

In my case, I created a playbook that performs the following actions:

- Installs the necessary packages for my development environment, such as `git`, `nvim`, and `tmux`.
- Copies my *dotfiles* to the user's home directory.
- Configures Git with my username and email.
- Sets up `vim` and `tmux` configurations according to my preferences.

Here's a snippet of my playbook:

```yaml
---
- name: Configure TMUX environment
  hosts: localhost
  become: yes
  vars:
    user_home: "{{ lookup('env', 'HOME') }}"
    user: "{{ lookup('env', 'USER') }}"
    dotfiles_directory: "{{ lookup('env', 'HOME') }}/.dotfiles"
    packages:
      - tmux
      - stow
      - tmuxinator
  tasks:
    - name: Install dependencies
      apt:
        name: "{{ packages }}"
        state: present

    - name: Clone tpm
      git:
        repo: https://github.com/tmux-plugins/tpm.git
        dest: ~/.tmux/plugins/tpm

    - name: Stow dotfiles
      shell: stow -t ~ tmux
      args:
        chdir: "{{ dotfiles_directory }}"
```

## Running the Playbook

Once the playbook is defined, executing it is straightforward. From the command line, I simply run:

```bash
ansible-playbook my_playbook.yml --ask-become-pass
```

Ansible takes care of executing each task in the defined order, ensuring that my development environment is configured consistently on any machine.

*Note: The `--ask-become-pass` flag requests the sudo password to execute tasks that require administrator privileges.*

*Note 2: In my case, I use `localhost` as the host, since the tasks are executed on the same machine from which I launch the playbook.*

### Importing Other Playbooks

To keep my configuration organized and modular, I've divided my playbook into several YAML files. For example, I have a `neovim.yml` file that handles `vim` configuration and another `tmux.yml` file that handles `tmux` configuration. Then, in my main playbook, I import these files as follows:

```yaml
---
- name: Main playbook to install required tools
  hosts: localhost
  gather_facts: false

...
- import_playbook: required-tools/neovim.yml
- import_playbook: required-tools/tmux.yml
...
```

## Benefits Gained

By automating the configuration of my development environment with Ansible, I've achieved:

- **Convenience**: I can now quickly configure any machine with my preferred development environment.
- **Consistency**: All my machines now have the same configuration, reducing errors and unexpected behaviors.
- **Efficiency**: Manual configuration of each machine can be tedious and error-prone. With Ansible, this process is done automatically and quickly.
- **Scalability**: If I need to add a new tool or modify a configuration, I only need to update the playbook and run Ansible on all my machines.

## Conclusion

Ansible has become an essential tool in my workflow as a developer. It allows me to maintain a coherent and efficient development environment across multiple machines, making it easier to manage and update my configurations. I recommend other developers consider automating their environments using tools like Ansible to improve their productivity and reduce errors.

---

*Note: You can find the complete code of my playbooks and *dotFiles* in my [GitHub repository](https://github.com/aenrione/dotFiles/tree/main/ansible).*
